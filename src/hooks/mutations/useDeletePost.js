import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "../../services/communityServices";
import { removePostFromInfiniteData } from "../../util/community/removePostFromInfiniteData";

export function useDeletePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (postId) => deletePost(postId),

		onMutate: async (postId) => {
			const id = Number(postId);
			if (!Number.isFinite(id)) return { id: undefined };

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

			queryClient.setQueriesData(
				{ queryKey: ["community-posts"] },
				(old) => removePostFromInfiniteData(old, id)
			);

			queryClient.setQueriesData(
				{ queryKey: ["profile-posts"] },
				(old) => removePostFromInfiniteData(old, id)
			);

			queryClient.removeQueries({ queryKey: ["post", id], exact: true });

			return { id, previousCommunity, previousProfile, previousPost };
		},

		onError: (_err, _postId, context) => {
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

		onSettled: (_data, _err, postId) => {
			const id = Number(postId);
			if (Number.isFinite(id)) {
				queryClient.removeQueries({ queryKey: ["post", id], exact: true });
			}

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

