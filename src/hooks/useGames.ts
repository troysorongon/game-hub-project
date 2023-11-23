import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

const useGames = () => {
    interface Game {
        id: number;
        name: string;
    }

    interface GameList {
        count: number;
        results: Game[];
    }

    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController;
        apiClient
            .get<GameList>("/games", {signal: controller.signal})
            .then((res) => setGames(res.data.results))
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)
            });
        
        return () => controller.abort();
        
    }, [games, error]);

    return { games, error };
}

export default useGames;