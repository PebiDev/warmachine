import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <h3>About the Warmachine</h3>
      <p>
        In 1984 TSR published the Companion Rules for Dungeons and Dragons. It
        was the third boxed set for the first Edition of the Roleplaying game.
        In the Companion Rules characters could advance from levels 15 to 25 and
        earn their own dominions as rewards for their adventures. Ruling over
        these dominions also allowed players to raise troops for or even against
        their lieges. The Companion rules included a relative simple but elegant
        mass combat system called "the warmachine". The warmachine lacked the
        sophistication and complexity of wargames but allowed for a relative
        fast way of conflict resolution between armies.
      </p>
    </div>
  );
}
