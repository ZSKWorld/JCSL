import { UserInput, UserOutput } from "./Interface";
export interface IRegister {
    register(data: RegisterInput): Promise<RegisterOutput>;
}
export interface RegisterInput extends UserInput {
    account: string;
    password: string;
    nickname: string;
}
export interface RegisterOutput extends UserOutput {
}
