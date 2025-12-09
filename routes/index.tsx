import { getPosts, Post } from "@/utils/posts.ts";
import PostListView from "@/components/PostsList.tsx";
import MyIntroduce from "@/components/MyIntroduce.tsx";

export const handler = {
  async GET(ctx: any) {
    const lang = ctx.req.headers.get("accept-language");
    const language = (lang ?? "").split(",")[0];

    const posts = await getPosts(language === "zh-CN" ? "zh-CN" : "en-US");
    return ctx.render(<BlogIndexPage posts={posts} />);
  },
};

function BlogIndexPage({ posts }: { posts: Post[] }) {
  return (
    <main class="max-w-screen-md px-4 mx-auto">
      <div class="flex flex-col items-center md:items-start justify-start md:justify-between">
        <MyIntroduce />
        <PostListView posts={posts} />
      </div>
    </main>
  );
}
