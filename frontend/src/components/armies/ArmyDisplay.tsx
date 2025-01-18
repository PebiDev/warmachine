import { useMemo } from "react";
import { IArmy } from "../../types/dto";
import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

const calculateLeaderFactor = ({ leader }: IArmy) => {
  if (!leader) return 0;
  const result =
    leader.intAdjustment +
    leader.wisAdjustment +
    leader.chaAdjustment +
    leader.leaderLevel;

  return result;
};

const calculateBasicForceFactor = (army: IArmy) => {
  const basicForceFactor =
    calculateLeaderFactor(army) +
    army.experienceFactor +
    army.trainingFactor +
    army.equipmentFactor +
    army.specialTroopFactor * 20;
  return basicForceFactor;
};

const calculateBattleRating = (army: IArmy) => {
  const basicForceFactorFraction = Math.ceil(
    calculateBasicForceFactor(army) / 10
  );
  let battleRating = calculateBasicForceFactor(army);
  if (army.mountedFactor >= 0.2) battleRating += basicForceFactorFraction;
  if (army.mountedFactor >= 0.5) battleRating += basicForceFactorFraction;
  if (army.missileFactor >= 0.2) battleRating += basicForceFactorFraction;
  if (army.missileFactor >= 0.5) battleRating += basicForceFactorFraction;
  if (army.magicalFactor >= 0.01) battleRating += basicForceFactorFraction;
  if (army.magicalFactor >= 0.2) battleRating += basicForceFactorFraction;
  if (army.magicalFactor >= 1) battleRating += basicForceFactorFraction;
  if (army.spellFactor >= 0.05) battleRating += basicForceFactorFraction;
  if (army.spellFactor >= 0.3) battleRating += basicForceFactorFraction;
  if (army.flyingFactor >= 0.01) battleRating += basicForceFactorFraction;
  if (army.flyingFactor >= 0.2) battleRating += basicForceFactorFraction;
  if (army.speedFactor) battleRating += basicForceFactorFraction;

  return battleRating;
};

interface ArmyComponentProps {
  army: IArmy;
}
const ArmyComponent = ({ army }: ArmyComponentProps) => {
  const [basicForceFactor, battleRating] = useMemo(
    () => [calculateBasicForceFactor(army), calculateBattleRating(army)],
    [army]
  );

  // delete navigation
  const navigate = useNavigate();
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate({ to: "/armies/delete/$id", params: { id: `${army.id}` } });
  };
  const handleUpdate = () => {
    navigate({ to: "/armies/update/$id", params: { id: `${army.id}` } });
  };

  return (
    <TableRow hover onClick={handleUpdate}>
      <TableCell>{army.id}</TableCell>
      <TableCell align="right">{army.name}</TableCell>
      <TableCell align="right">{battleRating}</TableCell>
      <TableCell align="right">{basicForceFactor}</TableCell>
      <TableCell align="right">
        <Button variant="text" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ArmyComponent;
