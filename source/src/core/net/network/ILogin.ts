import { UserInput, UserOutput } from "./Interface";

export interface ILogin {
    login(data: LoginInput): void;
}

export interface LoginInput extends UserInput {
    account: string;
    password: string;
}

export interface LoginOutput extends UserOutput {
}