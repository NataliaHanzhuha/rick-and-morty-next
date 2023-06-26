import { ICharacter } from "./Character";

export interface IEpisode {
    name: string;
    id: number;
    air_date: string;
    characters: ICharacter[];
    episode: string;
}
