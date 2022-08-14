import { UserInput, UserOutput } from "./Interface";

export interface ILogin {
    login(data: LoginInput): Promise<LoginOutput>;
}


export interface LoginInput extends UserInput {
    account: string;
    password: string;
}
export interface LoginOutput extends UserOutput {

}