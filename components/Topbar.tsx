function Link({ href, children }: { href: string; children: any }) {
  return (
    <a
      class="cursor-pointer"
      href={href}
    >
      {children}
    </a>
  );
}

export default function Topbar() {
  const links = [
    { href: "https://www.linkedin.com/in/maxwellwang-dev/", text: "Linkedin" },
    { href: "https://github.com/minmaxw1024", text: "Github" },
    { href: "/resume", text: "Resume" },
  ];

  return (
    <div class="top-0 z-50 fixed w-full bg-primary text-primary-content">
      <div class="container mx-auto flex items-center justify-between text-white p-4">
        <a class="text-2xl font-bold" href="/">Arcane Tome</a>
        <div class="flex items-center space-x-4">
          {links.map((link) => <Link href={link.href}>{link.text}</Link>)}
        </div>
      </div>
    </div>
  );
}
