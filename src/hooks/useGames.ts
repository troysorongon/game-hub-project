import { gameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenres";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[]
    metacritic: number;
}

const useGames = (GameQuery: gameQuery) => useData<Game>('/games', 
{ 
    params: { 
        genres: GameQuery.genre?.id, 
        parent_platforms: GameQuery.platform?.id,
        ordering: GameQuery.sort,
        search: GameQuery.search
    } 
}, [GameQuery])

export default useGames;