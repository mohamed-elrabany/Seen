import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editPost } from "../../services/communityServices";
import { removePostFromInfiniteData } from "../../util/community/removePostFromInfiniteData";
import { updatePostInInfiniteData } from "../../util/community/updatePostInInfiniteData";

function normalizeCategory(category) {
	if (category === null || category === undefined) return "";
	return String(category).trim().toLowerCase();
}

function stripUndefined(obj) {
	if (!obj || typeof obj !== "object") return obj;
	const cleaned = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined) cleaned[key] = value;
	}
	return cleaned;
}

function mergeEditedFields(oldPost, editedFields) {
	if (!oldPost) return oldPost;
	return { ...oldPost, ...editedFields };
}

function isPostLike(value) {
	if (!value || typeof value !== "object") return false;
	const id = Number(value.id);
	return Number.isFinite(id) && typeof value.category === "string";
}

export function useEditPost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, postData }) => editPost(postId, postData),

		onMutate: async ({ postId, postData }) => {
			const id = Number(postId);
			if (!Number.isFinite(id)) return { id: undefined };

			const cleanedPostData = stripUndefined(postData);

			await queryClient.cancelQueries({ queryKey: ["community-posts"] });
			await queryClient.cancelQueries({ queryKey: ["profile-posts"] });
			await queryClient.cancelQueries({ queryKey: ["post", id] });

			const previousCommunity = queryClient.getQueriesData({
				queryKey: ["community-posts"],
			});
			const previousProfile = queryClient.getQueriesData({
				queryKey: ["profile-posts"],
			});
			const previousPost = queryClient.getQueryData(["post", id]);

			// 1) Update detail cache immediately
			queryClient.setQueryData(["post", id], (old) =>
				mergeEditedFields(old, cleanedPostData)
			);

			// 2) Update profile feeds (no category filtering) in-place
			queryClient.setQueriesData(
				{ queryKey: ["profile-posts"] },
				(old) =>
					updatePostInInfiniteData(old, id, (post) =>
						mergeEditedFields(post, cleanedPostData)
					)
			);

			// 3) Update community feeds with category move behavior
			const newCategory = normalizeCategory(cleanedPostData?.category);
			if (Array.isArray(previousCommunity)) {
				for (const [queryKey, data] of previousCommunity) {
					if (!Array.isArray(queryKey) || queryKey[0] !== "community-posts") {
						continue;
					}

					const keyCategory = normalizeCategory(queryKey[1]);
					const isAllFeed = keyCategory === "";

					// All-feed always updates in place
					if (isAllFeed) {
						queryClient.setQueryData(queryKey, (old) =>
							updatePostInInfiniteData(old, id, (post) =>
								mergeEditedFields(post, cleanedPostData)
							)
						);
						continue;
					}

					// If category changed and this cache is for a different category, remove it.
					if (newCategory && keyCategory !== newCategory) {
						queryClient.setQueryData(queryKey, (old) =>
							removePostFromInfiniteData(old, id)
						);
						continue;
					}

					// Otherwise update in place (matching category)
					queryClient.setQueryData(queryKey, (old) =>
						updatePostInInfiniteData(old, id, (post) =>
							mergeEditedFields(post, cleanedPostData)
						)
					);
				}
			}

			return { id, previousCommunity, previousProfile, previousPost };
		},

		onError: (_err, _vars, context) => {
			const id = context?.id;
			const previousCommunity = context?.previousCommunity;
			const previousProfile = context?.previousProfile;
			const previousPost = context?.previousPost;

			if (Array.isArray(previousCommunity)) {
				for (const [queryKey, data] of previousCommunity) {
					queryClient.setQueryData(queryKey, data);
				}
			}

			if (Array.isArray(previousProfile)) {
				for (const [queryKey, data] of previousProfile) {
					queryClient.setQueryData(queryKey, data);
				}
			}

			if (Number.isFinite(id)) {
				queryClient.setQueryData(["post", id], previousPost);
			}
		},

		onSuccess: (updatedPost, vars) => {
			const id = Number(vars?.postId);
			if (!Number.isFinite(id) || !updatedPost) return;

			// Some backends return `{message: ...}` or `true` for update endpoints.
			// Only overwrite caches when we got an actual post object.
			if (!isPostLike(updatedPost)) return;

			// Prefer the server response as final truth
			queryClient.setQueryData(["post", id], updatedPost);

			queryClient.setQueriesData(
				{ queryKey: ["profile-posts"] },
				(old) => updatePostInInfiniteData(old, id, () => updatedPost)
			);

			// Update all community caches; the category-move behavior will be handled on next refetch.
			queryClient.setQueriesData(
				{ queryKey: ["community-posts"] },
				(old) => updatePostInInfiniteData(old, id, () => updatedPost)
			);
		},

		onSettled: (_data, _err, vars) => {
			const id = Number(vars?.postId);
			if (!Number.isFinite(id)) return;

			queryClient.invalidateQueries({ queryKey: ["post", id], exact: true });
			// Keep list refetching minimal (only active observers)
			queryClient.invalidateQueries({
				queryKey: ["community-posts"],
				refetchType: "active",
			});
			queryClient.invalidateQueries({
				queryKey: ["profile-posts"],
				refetchType: "active",
			});
		},
	});
}

