import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/armies/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h3>Create New Army</h3>
    </div>
  );
}
