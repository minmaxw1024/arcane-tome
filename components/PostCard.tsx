import { Post } from "@/utils/posts.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="border(t gray-200) flex flex-col rounded-2xl py-3 mb-2">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <div class="flex flex-row justify-between items-center mb-1">
          <h3 class="text-xl text-accent font-medium font-alegreya hover:cursor-pointer underline hover:no-underline underline-offset-2">
            {post.title}
          </h3>
          <time class="text-accent-content">
            {new Date(post.publishedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </a>
      <div class="text-base-content">
        {post.snippet}
      </div>
    </div>
  );
}
