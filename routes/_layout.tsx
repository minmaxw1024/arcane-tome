import { PageProps } from "$fresh/server.ts";
import Topbar from "@/components/Topbar.tsx";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div class="layout bg-base-100">
      <Topbar />
      <div class="py-[70px] box-border">
        <Component />
      </div>
      <footer class="fixed bottom-0 left-0 right-0 flex items-center justify-center text-base-content bg-neutral py-3 box-border">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
          />
        </a>
      </footer>
    </div>
  );
}
