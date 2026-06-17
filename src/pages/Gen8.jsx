import { useEffect, useState } from "react";
import { getPokemonGen8 } from "../service/pokedex";
import PokeCard from "../components/PokeCard";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Button, HStack, VStack, Text } from "@chakra-ui/react";


const Gen8 = () => {

    const [pokemon, setPokemon] = useState([])

    const fetchPoke = async () => {

        try {
            const response = await getPokemonGen8();
            setPokemon(response.data.results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPoke();


    }, [])


    return (
        <Box minH="100vh" bg="linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)">
            {/* CONTENU */}
            <Box py={6} px={4}>
                <Container maxW="7xl">
                    {/* Titre */}
                    <Heading
                        as="h1"
                        size="xl"
                        color="white"
                        mb={8}
                        textAlign="center"
                        fontWeight="extrabold"
                        letterSpacing="3px"
                    >
                        GEN 8
                    </Heading>

                    {/* Grille 6 colonnes */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(auto-fill, minmax(160px, 1fr))"
                        gap={3}
                    >
                        {pokemon.map((pokemon)=> {
                            pokemon.id = pokemon.url.split('/').filter(Boolean).pop();

                            return <PokeCard key={pokemon.name} pokemon={pokemon} id={pokemon.id} compact={true} />;
                        })}
                    </Box>
                </Container>
            </Box>






        </Box>
    )
}

export default Gen8;