import { createLazyFileRoute } from "@tanstack/react-router";
import { useCombatContext } from "./combat.lazy";
import { IArmy } from "../types/dto";
import { calculateBattleRating } from "../components/armies/calculateBasicForceFactor";
import { useState } from "react";
import {
  IAttackerForceModifiers,
  IDefenderForceModifiers,
} from "../components/combat/forceModifiers";

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
  const [combatModifierAttacker, setCombatModifierAttacker] =
    useState<IAttackerForceModifiers>({
      environment: {},
      morale: {},
      terrain: {},
    });
  const [combatModifierDefender, setCombatModifierDefender] =
    useState<IDefenderForceModifiers>({
      environment: {},
      morale: {},
      terrain: {},
    });

  if (!attacker || !defender) return "...Uaaaagh!";

  const handleCombat = () => {};

  return (
    <div>
      <h1>Combat!</h1>
      <p>
        Attacker {attacker.name}({calculateBattleRating(attacker)}) and Defender{" "}
        {defender.name}({calculateBattleRating(defender)})
      </p>
      <div>
        <button>Start Combat</button>
      </div>
      <div id="combat-result">Display Combat Result</div>
      <button>Fight Again</button>
    </div>
  );
}
