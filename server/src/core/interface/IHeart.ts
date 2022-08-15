import { UserInput, UserOutput } from "./Interface";

export interface IHeart {
    heart(data: HeartInput): void;
}

export interface HeartInput extends UserInput {

}

export interface HeartOutput extends UserOutput {
    timeStamp: number;
}