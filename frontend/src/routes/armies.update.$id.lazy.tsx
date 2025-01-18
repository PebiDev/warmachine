import { createLazyFileRoute } from "@tanstack/react-router";
import ArmyUpdateComponent from "../components/armies/update/ArmyUpdate";

export const Route = createLazyFileRoute("/armies/update/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div>
      <h3>Update Army {id}</h3>
      <ArmyUpdateComponent id={id} />
    </div>
  );
}
