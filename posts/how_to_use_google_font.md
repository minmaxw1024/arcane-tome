---
title: How to use Google Font in Tailwind CSS
published_at: 2024-11-15T15:00:00.000Z
snippet: 3 steps to use Google Font in Tailwind CSS
---

## Why do we use Google Font?

First of all, I'd like a better looking font for my website😂

The benefits of using Google Font are:

- **Performance**: Google Fonts are hosted on a fast, reliable CDN. They can be loaded faster than self-hosted fonts(for non-chinese users).

- **Free**: Google Fonts are free to use.

- **Variety**: Google Fonts has a wide variety of fonts to choose from, and I can easily find the font that suits my website, by typing the text I want to display in the font.

## How to use Google Font in Tailwind CSS

### Step 1: Find the font you like

Go to [Google Fonts](https://fonts.google.com/?preview.text=Arcane%20Tome).
Type what you want to display in the textarea, and find the font you like. For example, I choose [Grenze](https://fonts.google.com/?preview.text=Arcane%20Tome&query=Grenze). It's a serif font, a little vintage style, I think it's suitable for my blog.

![google front](/static/posts/google_font_01.png)

### Step 2: Add the font to your project

Click the "Get font" button, and select "Get embed code". You can select what styles do you want to use, and copy the code. In my fresh project, I put the codes in `_layout.tsx` like this:

![google front](/static/posts/google_font_02.png)

```tsx
import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html data-theme="emerald">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Arcane Tome</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Grenze:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
```

This will import the google font into your project. And next step, we need to integrate the font into our Tailwind CSS.

### Step 3: Integrate the font into Tailwind CSS

Add theme configuration in `tailwind.config.js`:

```js
export default {
  content: ["{routes,islands,components}/**/*.{ts,tsx,js,jsx}"],
  plugins: [
    // @ts-expect-error
    daisyui,
  ],
  theme: {
    // using extend to avoid overriding the default theme, if you want to use the default theme, you can remove the extend key
    extend: {
      fontFamily: {
        // Add the font you want to use here
        grenze: ["Grenze", "sans-serif"],
      },
    },
  },
};
```

Now you can use the font in your project like this:

```tsx
export default function Home() {
  return (
    <div className="font-grenze">
      <h1 className="text-4xl font-bold">Hello, world!</h1>
      <p className="text-lg">This is a blog post.</p>
    </div>
  );
}
```

That's it! Now you can use Google Font in your Tailwind CSS project. It's not that hard, right?😉
