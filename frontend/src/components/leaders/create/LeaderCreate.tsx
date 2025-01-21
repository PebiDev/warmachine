import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { ILeader } from "../../../types/dto";
import { LeaderForm } from "../LeaderForm";

const createLeader = async (leader: ILeader) => {
  const response = await fetch(`/api/leaders`, {
    method: "PUT",
    body: JSON.stringify(leader),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`Failed to create Leader`);
};

const LeaderCreateComponent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/leaders" });
  };
  const { mutate } = useMutation({
    mutationKey: ["leaders", "create"],
    mutationFn: createLeader,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaders"] });
      handleClose();
    },
  });

  return <LeaderForm onSubmit={mutate} />;
};

export default LeaderCreateComponent;
