import { AxiosPromise } from "axios";
import API from "../lib/axios";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  city: string;
  age: number;
}

export type LoginPayload = Pick<SignupPayload, "email" | "password">;

export interface UpdateLevelsPayload {
  userId: string;
  level: number;
}

export const signupService = (payload: SignupPayload): AxiosPromise => {
  return API.post("/signup", payload);
};

export const loginService = (payload: LoginPayload): AxiosPromise => {
  return API.post("/login", payload);
};

export const getLevelsOfUserService = (userId: string): AxiosPromise => {
  return API.get(`/users/${userId}/levels`);
};

export const updateLevelsOfUserService = ({
  userId,
  level,
}: UpdateLevelsPayload): AxiosPromise => {
  return API.put(`/users/${userId}/levels`, { level });
};
