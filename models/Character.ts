import { Description, IDescription } from "./Description";

export interface ICharacter {
    name: string;
    id: number;
    status: string;
    gender: string;
    species: string;
    image: string;
    origin: IDescription;
    location: IDescription ;
    episode: IDescription[];
}