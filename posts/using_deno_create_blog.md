---
title: Using Deno to Create a Blog
published_at: 2024-11-05T15:00:00.000Z
snippet: Using Deno and Fresh to create a blog, and deploy it to Deno Deploy.
---

I'm using Deno to create a blog. Deno is a secure runtime for JavaScript and TypeScript. It's built with V8, Rust, and Tokio. It's a modern runtime for JavaScript and TypeScript, and it's secure by default.

## create a new fresh app

Using Deno and Fresh create a fresh app.

```bash
deno run -A -r https://fresh.deno.dev
cd fresh-blog
deno task start
```

## Update the directory structure

### Create posts

Create a new directory for posts.

```bash
mkdir posts
```

Remove useless folders.

```bash
rm -rf components/ islands/ routes/api
```

### Add a post to the blog

Create a new post.

```bash
touch posts/hello.md
```

Add content to the post.

```markdown
---
title: This is my first blog post!
published_at: 2024-11-04T15:00:00.000Z
snippet: This is an excerpt of my first blog post.
---

Hello, world!
```

## Add utility functions

Make a folder for utility functions.

```bash
mkdir utils
```

Create basic interfaces or typesto get all posts.

```typescript
// utils/posts.ts
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
```

Install parse frontmatter.

```bash
deno add jsr:@std/front-matter
```

Extract posts from posts directory.

```typescript
import { extract } from "@std/front-matter/any";
import { join } from "$std/path/mod.ts";

async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    const post = await getPost(slug);
    if (post) {
      promises.push(post);
    }
  }
  const posts = (await Promise.all(promises)) as Post[];
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
```

## Get all posts

Get all posts and display them on the home page.

```typescript
// routes/index.tsx
// this handler will get all posts and render them
export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};
```

### Add a postcard component

```bash
mkdir components
touch components/PostCard.tsx
```

```typescript
// components/PostCard.tsx
import { Post } from "@/utils/posts.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border(t gray-200)">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text(3xl gray-900) font-bold">{post.title}</h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-900">{post.snippet}</div>
      </a>
    </div>
  );
}
```

### Update the home page

```typescript
// routes/index.tsx
import PostCard from "@/components/PostCard.tsx";

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">Blog</h1>
      <div class="my-8">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </main>
  );
}
```
