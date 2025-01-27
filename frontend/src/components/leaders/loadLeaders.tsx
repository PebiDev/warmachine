import { ILeader } from "../../types/dto";

export const loadLeaders = async (): Promise<ILeader[]> => {
  const response = await fetch("/api/leaders");
  const leaders = await response.json();
  return leaders;
};
