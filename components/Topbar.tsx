function Link({ href, children }: { href: string; children: any }) {
  // open in new tab if external link
  return (
    <a
      class="cursor-pointer"
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
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
    <div class="top-0 z-50 fixed w-full bg-neutral text-primary-content">
      <div class="container mx-auto flex items-center justify-between text-white p-4">
        <a class="text-3xl font-bold font-grenze" href="/">Arcane Tome</a>
        <div class="flex items-center space-x-4">
          {links.map((link) => (
            <Link href={link.href}>
              <span class="font-grenze text-base">{link.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
