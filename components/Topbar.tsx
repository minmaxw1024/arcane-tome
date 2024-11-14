// generate a topbar component for my website
// it has a title, a search bar, and a button
// using the daisyUI framework
// in mobile view, the button should be hidden
// in desktop view, the search bar should be hidden

export default function Topbar() {
  return (
    <div class="top-0 z-50 fixed w-full bg-primary text-primary-content">
      <div class="container mx-auto flex items-center justify-between p-4">
        <h1 class="text-2xl font-bold">Arcane Tome</h1>
      </div>
    </div>
  );
}
