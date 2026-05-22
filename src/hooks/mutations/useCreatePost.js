import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/communityServices";

export function useCreatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (postData) => createPost(postData),

		onSuccess: () => {
			// Invalidate both community and profile posts caches to refetch with the new post
			queryClient.invalidateQueries({
				queryKey: ["community-posts"],
			});

			queryClient.invalidateQueries({
				queryKey: ["profile-posts"],
			});
		},
	});
}
