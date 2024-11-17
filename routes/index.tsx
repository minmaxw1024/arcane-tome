import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import PostCard from "@/components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const lang = _req.headers.get("accept-language");
    const language = (lang ?? "").split(",")[0];

    const posts = await getPosts(language === "zh-CN" ? "zh-CN" : "en-US");
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main class="max-w-screen-md px-4 mx-auto">
      <div class="flex md:flex-row flex-col items-center md:items-start justify-start md:justify-between">
        <img class="w-56 h-56" alt="dino" src="/my-dino.png" />
        <div class="my-8">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </div>
    </main>
  );
}
