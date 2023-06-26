import { ICharacter } from "./Character";

export interface ILocation {
    name: string;
    id: number;
    type: string;
    dimension: string;
    residents: ICharacter[];
}