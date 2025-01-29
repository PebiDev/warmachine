import {
  createLazyFileRoute,
  Outlet,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { loadArmies } from "../components/armies/loadArmies";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { IArmy } from "../types/dto";
import SelectForce from "../components/combat/SelectForce";
import { Button, Modal } from "@mui/material";
import { RouteOutletPaper } from "../components/armies/armies.styles";

const CombatContext = createContext<IArmy[]>([]);

export const useCombatContext = () => useContext(CombatContext);

const RouteOutlet = () => {
  const match = useMatchRoute();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ to: "/combat" });
  };
  return (
    <Modal open={!match({ to: "/combat" })} onClose={handleClose}>
      <RouteOutletPaper>
        <Outlet />
      </RouteOutletPaper>
    </Modal>
  );
};

export const Route = createLazyFileRoute("/combat")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["armies"],
    queryFn: loadArmies,
  });
  const [attacker, setAttacker] = useState<IArmy>();
  const [defender, setDefender] = useState<IArmy>();

  const navigate = useNavigate();

  if (isLoading) return "...";
  if (isError || !data) return " Uahh!";

  const handleFight = () => {
    if (!attacker || !defender) return;
    navigate({
      to: "/combat/$attackerID/$defenderID",
      params: { attackerID: `${attacker.id}`, defenderID: `${defender.id}` },
    });
  };

  return (
    <>
      <div>Please select an attacking and a defending force</div>

      <SelectForce
        label="Select Attacker"
        armies={data}
        onChange={setAttacker}
        selectedArmy={attacker}
      />
      <br />
      <SelectForce
        label="Select Defender"
        armies={data}
        onChange={setDefender}
        selectedArmy={defender}
      />
      <br />
      <Button
        variant="outlined"
        onClick={handleFight}
        disabled={!attacker || !defender}>
        Fight!
      </Button>
      <CombatContext.Provider value={data}>
        <RouteOutlet />
      </CombatContext.Provider>
    </>
  );
}
