import { Box, Button, ButtonGroup, Flex, HStack, Show } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface gameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sort: string;
  search: string
}

function App() {
  const [GameQuery, setGameQuery] = useState<gameQuery>({} as gameQuery);

  return (
    <Grid templateAreas={{
      base: `"nav" "main"`,
      lg: `"nav nav" "aside main"`
    }}
    templateColumns={{
      base: '1fr',
      lg: '200px 1fr'
    }}
    >
      <GridItem area={"nav"}>
        <NavBar onSearch={(search) => setGameQuery({...GameQuery, search})}></NavBar>
      </GridItem>
      {/* Will show only on large screens */}
      <Show above="lg"> 
        <GridItem area={"aside"} paddingX={5}>
          <GenreList selectedGenre={GameQuery.genre} onSelectGenre={(genre) => setGameQuery({...GameQuery, genre})}/>
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box paddingLeft={2}>
          <GameHeading GameQuery={GameQuery}></GameHeading>
          <Flex marginBottom={5}>
            <Box paddingRight={5}>
              <PlatformSelector onSelectPlatform={(platform) => setGameQuery({...GameQuery, platform})} selectedPlatform={GameQuery.platform}></PlatformSelector>
            </Box>
            <SortSelector onSelectSort={(sort) => setGameQuery({...GameQuery, sort})} selectedSort={GameQuery.sort}></SortSelector>
          </Flex>
        </Box>
        <GameGrid GameQuery={GameQuery}></GameGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
