import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import PostListView from "@/components/PostsList.tsx";
import MyIntroduce from "@/components/MyIntroduce.tsx";

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
      <div class="flex flex-col items-center md:items-start justify-start md:justify-between">
        <MyIntroduce />
        <PostListView posts={posts} />
      </div>
    </main>
  );
}
