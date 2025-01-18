import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArmyForms } from "../ArmyForm";
import { IArmy } from "../../../types/dto";

const createArmy = async (army: IArmy) => {
  const response = await fetch(`/api/armies`, {
    method: "PUT",
    body: JSON.stringify(army),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`Failed to create Army`);
};

const ArmyCreateComponent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/armies" });
  };
  const { mutate } = useMutation({
    mutationKey: ["armies", "create"],
    mutationFn: createArmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armies"] });
      handleClose();
    },
  });

  return <ArmyForms onSubmit={mutate} />;
};

export default ArmyCreateComponent;
