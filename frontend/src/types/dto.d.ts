export interface IArmy {
  id: number;
  name: string;
  leader?: ILeader;
  experienceFactor: number;
  trainingFactor: number;
  equipmentFactor: number;
  specialTroopFactor: number;
  mountedFactor: number;
  missileFactor: number;
  magicalFactor: number;
  spellFactor: number;
  flyingFactor: number;
  speedFactor: boolean;
  description?: string;
}

export interface ILeader {
  id: number;
  name: string;
  intAdjustment: number;
  wisAdjustment: number;
  chaAdjustment: number;
  leaderLevel: number;
}
