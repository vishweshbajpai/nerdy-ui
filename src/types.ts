import { NodeIds } from "./utils/enum";

export interface IUserDetails {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
}

export interface ILoginResponse {
  token: string;
  userDetails: IUserDetails;
}

export type LevelId = Exclude<
  NodeIds,
  NodeIds.signup | NodeIds.login | NodeIds.button
>;

export type IButtonNodePositionOfLevel = Record<
  LevelId,
  { x: number; y: number }
>;
