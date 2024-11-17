import { Post } from "@/utils/posts.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="border(t gray-200) flex flex-col mb-5 rounded-2xl hover:bg-slate-100 px-4 py-3">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text-xl gray-900 font-bold">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </a>
      <div class="text-gray-900">
        {post.snippet}
      </div>
    </div>
  );
}
