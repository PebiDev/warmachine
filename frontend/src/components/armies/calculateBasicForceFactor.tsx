import { IArmy } from "../../types/dto";

const calculateLeaderFactor = ({ leader }: IArmy) => {
  if (!leader) return 0;
  const result =
    leader.intAdjustment +
    leader.wisAdjustment +
    leader.chaAdjustment +
    leader.leaderLevel;

  return result;
};
export const calculateBasicForceFactor = (army: IArmy) => {
  const basicForceFactor =
    calculateLeaderFactor(army) +
    army.experienceFactor +
    army.trainingFactor +
    army.equipmentFactor +
    army.specialTroopFactor * 2;
  return basicForceFactor;
};
export const calculateBattleRating = (army: IArmy) => {
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
