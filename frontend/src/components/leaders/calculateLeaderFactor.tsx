import { ILeader } from "../../types/dto";

export const calculateLeaderFactor = (leader: ILeader) => {
  if (!leader) return 0;
  const result =
    leader.intAdjustment +
    leader.wisAdjustment +
    leader.chaAdjustment +
    leader.leaderLevel;

  return Math.round(result);
};
