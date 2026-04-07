import { useParams } from "react-router-dom";

export default function PostDetails(){
    const { postId }= useParams();
    
    return(
        <>
            <h1>Post Details</h1>
        </>
    );
}