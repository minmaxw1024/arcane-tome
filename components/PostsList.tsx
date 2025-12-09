import { Post } from "@/utils/posts.ts";
import PostCard from "@/components/PostCard.tsx";

function PostList({
  posts,
}: { posts: Post[] }) {
  return (
    <section class="my-8 flex flex-col">
      <div class="text-2xl font-semibold font-alegreya text-base-content">
        Posts
      </div>
      <div class="">
        {posts.map((post) => <PostCard post={post} />)}
      </div>
    </section>
  );
}
export default PostList;
