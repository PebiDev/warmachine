import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ILeader } from "../../../types/dto";
import { LeaderForm } from "../LeaderForm";

const updateLeader = async (leader: ILeader, id: string) => {
  const response = await fetch(`/api/leaders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(leader),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`Failed to update Leader`);
};

const getLeader = async (id: string) => {
  const response = await fetch(`/api/leaders/${id}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`Failed to get Leader`);
  return await response.json();
};

const LeaderUpdateComponent = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/leaders" });
  };
  const { mutate } = useMutation({
    mutationKey: ["leaders", "update", id],
    mutationFn: (leader: ILeader) => updateLeader(leader, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaders"] });
      handleClose();
    },
  });
  const { data, isError, isLoading } = useQuery({
    queryKey: ["leaders", id],
    queryFn: () => getLeader(id),
  });
  if (isLoading) return "...";
  if (isError) return " Uahh!";
  return <LeaderForm onSubmit={mutate} existingLeader={data} />;
};

export default LeaderUpdateComponent;
