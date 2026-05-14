import api from "../api/axios";

async function handleRequest(request) {
    try {
        const response = await request;
        
        // 1. Check if the backend used 'data' (Post style)
        if (response.data.data !== undefined) return response.data.data;
        
        // 2. Check if the backend used 'comments' (Comment index style)
        if (response.data.comments !== undefined) return response.data.comments;
        
        // 3. Check if the backend returned a single resource (Comment store/update style)
        if (response.data.comment !== undefined) return response.data.comment;

        // 4. Fallback: return the whole data object
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Something wrong happened!';
    }
}

// ==================== Posts ====================

export function getPostsData(category, page){
    return handleRequest(
        api.get("/posts", {
            params: { page, category }
        })
    );
}

export function getPostById(postId){
    return handleRequest(
        api.get(`/posts/${postId}`)
    );

}

export function getUserPosts(userId, page){
    return handleRequest(
        api.get(`/users/${userId}/posts`, {
            params: { page }
        })
    );

}

export function createPost(postData){
    return handleRequest(
        api.post("/posts", postData)
    );
}

export function editPost(postId, postData){
    return handleRequest(
        api.post(`/posts/${postId}`, postData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    );
}

export function deletePost(postId){
    return handleRequest(
        api.delete(`/posts/${postId}`)
    );
}

export function likePost(postId){
    return handleRequest(
        api.post(`/posts/${postId}/like`)
    );
}

// ==================== Comments ====================

// Add 'async' here!
export function getPostComments(postId, page) {
    return handleRequest(
        api.get(`/posts/${postId}/comments`, {
            params: { page }
        })
    );
}

export function addPostComment(postId, commentContent){
    return handleRequest(
        api.post(`/posts/${postId}/comments`, {
            comment_text: commentContent
        })
    );
}

export function editPostComment(commentId, commentContent){
    return handleRequest(
        api.put(`/comments/${commentId}`, {
            comment_text: commentContent
        })
    );
}

export function deletePostComment(commentId){
    return handleRequest(
        api.delete(`/comments/${commentId}`)
    );
}

export function likeComment(commentId){
    return handleRequest(
        api.post(`/comments/${commentId}/like`)
    );
}

// ==================== Search ====================
export function search(query, page){
    return handleRequest(
        api.get("/search", {
            params: { query, page }
        })
    );
}
