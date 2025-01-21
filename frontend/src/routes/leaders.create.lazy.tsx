import { createLazyFileRoute } from "@tanstack/react-router";
import LeaderCreateComponent from "../components/leaders/create/LeaderCreate";

export const Route = createLazyFileRoute("/leaders/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h3>Create New Leader</h3>
      <LeaderCreateComponent />
    </div>
  );
}
