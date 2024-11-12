---
title: 使用 Deno 创建博客
published_at: 2024-11-05T15:00:00.000Z
snippet: 使用 Deno 和 Fresh 创建一个全新的博客。
---

我正在使用 Deno 创建一个博客。Deno 是一个 JavaScript 和 TypeScript
的安全运行时。它是用 V8、Rust 和 Tokio 构建的。它是一个现代的 JavaScript 和
TypeScript 运行时，并且默认是安全的。

## 创建一个新的 Fresh 应用

使用 Deno 和 Fresh 创建一个全新的应用。

```bash
deno run -A -r https://fresh.deno.dev
cd fresh-blog
deno task start
```

## 更新目录结构

### 创建 posts 目录

为文章创建一个新的目录。

```bash
mkdir posts
```

删除无用的文件夹。

```bash
rm -rf components/ islands/ routes/api
```

### 在博客中添加一篇文章

创建一篇新文章。

```bash
touch posts/hello.md
```

为文章添加内容。

```markdown
---
title: This is my first blog post!
published_at: 2024-11-04T15:00:00.000Z
snippet: This is an excerpt of my first blog post.
---

Hello, world!
```

## 添加实用函数

创建一个实用函数的文件夹。

```bash
mkdir utils
```

创建基本接口或类型以获取所有文章。

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

安装解析 frontmatter 的包。

```bash
deno add jsr:@std/front-matter
```

从 posts 目录中提取文章。

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

## 获取所有文章

获取所有文章并显示在主页上。

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

### 增加一个文章列表组件

```bash
mkdir components
touch components/PostCard.tsx
```

组件内容：

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

### 更新主页

```typescript
// routes/index.tsx
import PostCard from "@/components/PostCard.tsx";

export default function BlogIndexPage(props: PageProps<Post[]>) {
    const posts = props.data;
    return (
        <main class="max-w-screen-md px-4 pt-16 mx-auto">
            <h1 class="text-5xl font-bold">Blog</h1>
            <div class="my-8">
                {posts.map((post) => <PostCard post={post} />)}
            </div>
        </main>
    );
}
```
