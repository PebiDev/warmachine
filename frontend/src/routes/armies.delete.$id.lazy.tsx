import { Button, DialogActions, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/armies/delete/$id")({
  component: RouteComponent,
});

const deleteArmy = async (armyId: string) => {
  const response = await fetch(`/api/armies/${armyId}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`Failed to delete ${armyId}`);
};

function RouteComponent() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/armies" });
  };

  const { mutate } = useMutation({
    mutationKey: ["armies", "delete", id],
    mutationFn: deleteArmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armies"] });
      handleClose();
    },
  });
  const handleDelete = () => mutate(id);
  return (
    <>
      <DialogContent>Delete Army ID "{id}"?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDelete}>Yes</Button>
      </DialogActions>
    </>
  );
}
