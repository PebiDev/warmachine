import { createLazyFileRoute } from "@tanstack/react-router";
import { useCombatContext } from "./combat.lazy";
import { IArmy } from "../types/dto";
import { calculateBattleRating } from "../components/armies/calculateBasicForceFactor";
import { useState } from "react";

export const Route = createLazyFileRoute("/combat/$attackerID/$defenderID")({
  component: RouteComponent,
});

const findArmy = (armyID: string, armies: IArmy[]) => {
  return armies.find((army) => army.id == Number(armyID));
};

function RouteComponent() {
  const armies = useCombatContext();
  const { attackerID, defenderID } = Route.useParams();
  const attacker = findArmy(attackerID, armies);
  const defender = findArmy(defenderID, armies);
  const [combatModifierAttacker, setCombatModifierAttacker] = useState(0);
  const [combatModifierDefender, setCombatModifierDefender] = useState(0);

  if (!attacker || !defender) return "...Uaaaagh!";

  return (
    <div>
      <h1>
        Combat! Attacker {attacker.name}({calculateBattleRating(attacker)}) and
        Defender {defender.name}({calculateBattleRating(defender)})
      </h1>
    </div>
  );
}
