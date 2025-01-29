import { IArmy } from "../../types/dto";

export const loadArmies = async (): Promise<IArmy[]> => {
  const response = await fetch("/api/armies");
  const armies = await response.json();
  return armies;
};
