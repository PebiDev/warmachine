import { Button, DialogActions, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/leaders/delete/$id")({
  component: RouteComponent,
});

const deleteLeader = async (leaderId: string) => {
  const response = await fetch(`/api/leaders/${leaderId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete ${leaderId}`);
};

function RouteComponent() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/leaders" });
  };

  const { mutate } = useMutation({
    mutationKey: ["leaders", "delete", id],
    mutationFn: deleteLeader,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaders"] });
      queryClient.invalidateQueries({ queryKey: ["armies"] });
      handleClose();
    },
  });
  const handleDelete = () => mutate(id);
  return (
    <>
      <DialogContent>Delete Leader ID "{id}"?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDelete}>Yes</Button>
      </DialogActions>
    </>
  );
}
