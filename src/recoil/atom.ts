import { FormInstance } from "antd";
import { atom } from "recoil";
import { NodeIds } from "../utils/enum";

type FormInstanceType = Pick<
  FormInstance,
  "getFieldsValue" | "validateFields" | "resetFields"
> | null;

interface SignupFormType {
  name: string;
  email: string;
  password: string;
  age: string;
  city: string;
  formInstance: FormInstanceType;
}

interface LoginFormType {
  email: string;
  password: string;
  formInstance: FormInstanceType;
}

type FormSourceType = NodeIds | null;

export const signupForm = atom<SignupFormType>({
  key: "signupForm",
  default: {
    name: "",
    email: "",
    password: "",
    age: "",
    city: "",
    formInstance: null,
  },
});

export const loginForm = atom<LoginFormType>({
  key: "loginForm",
  default: {
    email: "",
    password: "",
    formInstance: null,
  },
});

export const formSource = atom<FormSourceType>({
  key: "formSource",
  default: null,
});

export const destination = atom<string>({
  key: "destination",
  default: "",
});

export const broken = atom<string>({
  key: "broken",
  default: "",
});

export const ninja = atom<string>({
  key: "ninja",
  default: "",
});

export const treasureKey = atom<string>({
  key: "treasureKey",
  default: "",
});

export const celebrate = atom<boolean>({
  key: "celebrate",
  default: false,
});
