import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArmyForms } from "../ArmyForm";
import { IArmy } from "../../../types/dto";

const updateArmy = async (army: IArmy, id: string) => {
  const response = await fetch(`/api/armies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(army),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`Failed to update Army`);
};

const getArmy = async (id: string) => {
  const response = await fetch(`/api/armies/${id}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`Failed to get Army`);
  return await response.json();
};

const ArmyUpdateComponent = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/armies" });
  };
  const { mutate } = useMutation({
    mutationKey: ["armies", "update", id],
    mutationFn: (army: IArmy) => updateArmy(army, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armies"] });
      handleClose();
    },
  });
  const { data, isError, isLoading } = useQuery({
    queryKey: ["armies", id],
    queryFn: () => getArmy(id),
  });
  if (isLoading) return "...";
  if (isError) return " Uahh!";
  return <ArmyForms onSubmit={mutate} existingArmy={data} />;
};

export default ArmyUpdateComponent;
