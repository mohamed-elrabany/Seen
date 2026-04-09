import api from "../api/axios";

async function handleRequest(request){
    try{
        const response = await request;
        return response.data;
    }catch(error){
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

export function createPost(postData){
    return handleRequest(
        api.post("/posts", postData)
    );
}

export function editPost(postId, postData){
    return handleRequest(
        api.put(`/posts/${postId}`, postData)
    );
}

export function deletePost(postId){
    return handleRequest(
        api.delete(`/posts/${postId}`)
    );
}

export function togglePostLikes(postId){
    return handleRequest(
        api.post(`/posts/${postId}/like`)
    );
}

// ==================== Comments ====================

export function getPostComments(postId, page){
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

export function toggleCommentLikes(commentId){
    return handleRequest(
        api.post(`/comments/${commentId}/like`)
    );
}