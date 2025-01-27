import { createLazyFileRoute } from "@tanstack/react-router";
import LeaderUpdateComponent from "../components/leaders/update/LeaderUpdate";

export const Route = createLazyFileRoute("/leaders/update/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div>
      <h3>Update Leader {id}</h3>
      <LeaderUpdateComponent id={id} />
    </div>
  );
}
