import { PageProps } from "fresh";
import { Head } from "fresh/runtime";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "@deno/gfm";
import { HttpError } from "fresh";

export default async function PostPage(props: PageProps) {
  const post = await getPost(props.params.slug);
  if (post === null) {
    throw new HttpError(404);
  }

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>

      <main class="max-w-screen-md px-4 pt-16 mx-auto">
        <h1 class="text-5xl font-bold mb-4">{post.title}</h1>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          class="my-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
    </>
  );
}
