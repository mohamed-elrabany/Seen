import PostCard from "./PostCard";

import { posts } from "../../util/content";

export default function PostFeed(){

    return(
        <div className="flex-col-center gap-8 overflow-y-auto w-full py-8">
            {posts.map((post, index)=>(
                <PostCard 
                    key={index}
                    title={post.title}
                    body={post.body}
                    images={post.images}
                    category={post.category}
                    isLiked={post.isLiked}
                    isOwner={post.isOwner}
                    likesCount={post.likesCount}
                    commentsCount={post.commentsCount}
                    hashtags={post.hashtags}
                    dueDate={post.dueDate}
                    user={post.user}
                />
            ))}
        </div>
        
    );
}