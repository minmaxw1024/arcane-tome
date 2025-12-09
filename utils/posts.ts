import { extract } from "@std/front-matter/any";
import { join } from "$std/path/mod.ts";

async function getPosts(lang: "zh-CN" | "en-US"): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    if (lang === "en-US" && slug.includes("_zh")) {
      continue; // Skip posts with "_zh" in the name if the browser language is English
    }
    const post = await getPost(slug);
    if (post) {
      promises.push(post);
    }
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
  const { attrs, body } = extract<PostFrontMatter>(text);
  return {
    slug,
    title: attrs.title,
    publishedAt: new Date(attrs.published_at),
    content: body,
    snippet: attrs.snippet,
  };
}

interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
}

interface PostFrontMatter {
  title: string;
  published_at: string;
  snippet: string;
}

export { getPost, getPosts };
export type { Post };
