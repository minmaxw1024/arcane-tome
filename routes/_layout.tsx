import { PageProps } from "$fresh/server.ts";
import Topbar from "@/components/Topbar.tsx";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div class="layout bg-base-100">
      <Topbar />
      <div class="pt-[70px] box-border">
        <Component />
      </div>
    </div>
  );
}
