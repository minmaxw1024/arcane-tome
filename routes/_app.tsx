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
        >
        </link>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
