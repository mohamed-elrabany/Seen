import { useParams } from "react-router-dom";

export default function EditPost(){
    const { postId }= useParams();
    
    return(
        <>
            <h1>Edit Post</h1>
        </>
    );
}