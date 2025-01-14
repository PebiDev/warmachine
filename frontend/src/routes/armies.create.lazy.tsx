import { createLazyFileRoute } from "@tanstack/react-router";
import ArmyCreateComponent from "../components/armies/create/ArmyCreate";

export const Route = createLazyFileRoute("/armies/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h3>Create New Army</h3>
      <ArmyCreateComponent />
    </div>
  );
}
