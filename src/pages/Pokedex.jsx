import { useEffect, useState } from "react";
import { getAllPokemon } from "../service/pokedex";
import PokeCard from "../components/PokeCard";
import { Box, Container, Heading, Button, HStack, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";





const Pokedex = () => {

    const [pokemon, setPokemon] = useState([])
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0); // Will be updated from API
    const pageSize = 20; // nombre de pokémon par page
    const offset = (page - 1) * pageSize; // calcul de l'offset pour la requête API

    const fetchPoke = async () => {

        try {
            const response = await getAllPokemon(pageSize, offset);
            setPokemon(response.data.results);
            // Update total count from API response
            if (response.data.count) {
                setTotalCount(response.data.count);
            }
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        fetchPoke();


    }, [page])

    const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1; // Nombre total de pokémons dans PokeAPI

    return (
        <Box minH="100vh" bg="linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)" overflowX="hidden">
            {/* CONTENU */}
            <Box py={12}>
                <Container maxW="6xl">
                    {/* Titre */}
                    <Heading
                        as="h1"
                        size="2xl"
                        color="white"
                        mb={12}
                        textAlign="center"
                        fontWeight="extrabold"
                        letterSpacing="3px"
                    >
                        POKEDEX COMPLET
                    </Heading>

                    {/* Grille 4 colonnes */}
                    <Box
                        display="grid"
                        gridTemplateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
                        gap={6}
                    >
                        {pokemon.map((pokemon) => {
                            pokemon.id = pokemon.url.split('/').filter(Boolean).pop();

                            return <PokeCard key={pokemon.name} pokemon={pokemon} id={pokemon.id} />;
                        })}
                    </Box>
                </Container>
            </Box>

            {/* PAGINATION */}
            <Box py={8}>
                <Container maxW="6xl">
                    <HStack mt={10} justify="center" spacing={4}>
                    {/* Previous */}
                    <Button
                        onClick={() => {setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' });}}
                        isDisabled={page === 1}
                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        _hover={{ bg: "rgba(255,255,255,0.2)" }}
                        borderRadius="lg"
                    >
                        ← Précédent
                    </Button>

                    {/* Direct page input */}
                    <NumberInput
                        size="sm"
                        maxW="80px"
                        min={1}
                        max={totalPages}
                        value={page}
                        onChange={(valueString) => {
                            const val = Number(valueString);
                            if (!isNaN(val) && val >= 1 && val <= totalPages) {
                                setPage(val);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    {/* Next */}
                    <Button
                        onClick={() => {setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' });}}
                        isDisabled={page === totalPages}
                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        _hover={{ bg: "rgba(255,255,255,0.2)" }}
                        borderRadius="lg"
                    >
                        Suivant →
                    </Button>
                </HStack>
                    <Text color="gray.400" textAlign="center" mt={4} fontSize="sm">
                        Page {page} / {totalPages}
                    </Text>
                </Container>
            </Box>
        </Box>
    )
}

export default Pokedex;