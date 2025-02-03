export type ETroopRatios =
  | "1.5:1"
  | "2:1"
  | "3:1"
  | "4:1"
  | "5:1"
  | "6:1"
  | "7:1"
  | "8:1";

export interface ITroopRatio {
  troopRatio: troopRatios;
  largerForce: "Defender" | "Attacker";
}

export interface IMorale {
  inDominionOfLiege?: boolean;
  beatenFoeBefore?: boolean;
  hasBeenRouted?: boolean;
}

export type IAttackerMorale = morale & {
  attackingOnTheMarch?: boolean;
};

export interface IEnvironment {
  environmentFavorable?: "favorable" | "unfavorable";
  atNightWithNightvision?: boolean;
}

export interface ITerrain {
  higherGround?: boolean;
  mountedDisadvantage?: boolean;
  forceInMire?: boolean;
  forceInShiftingGround?: boolean;
}

export type IDefenderTerrain = terrain & {
  defendingInPlace?: boolean;
  attackerMustCrossWater?: boolean;
  defendingInNarrow?: boolean;
  defendingInRoughTerrain?: boolean;
  defendingFortress?: boolean;
};

export type EForceImmunity =
  | "immuneToAttacks"
  | "onePercentImmune"
  | "eightyPercentImmune";

export type EFatigued = "moderatlyFatigued" | "severlyFatigued";

export interface ISpecialCircumstances {
  specialCircumstance?: number;
}

export interface IAttackerForceModifiers {
  morale: attackerMorale;
  environment: environment;
  terrain: terrain;
  immunities?: forceImmunity;
  fatigued?: fatigued;
}

export interface IDefenderForceModifiers {
  morale: morale;
  environment: environment;
  terrain: defenderTerrain;
  immunities?: forceImmunity;
  fatigued?: fatigued;
}
