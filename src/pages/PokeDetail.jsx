import { useEffect, useState } from "react";
import { getPokemonbyId, getPokemonSpecies, getTypeDetails } from "../service/pokedex";
import { Box, Container, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PokeDetail = () => {
  const [pokemon, setPokemon] = useState({});
  const [frenchData, setFrenchData] = useState({ name: "", types: [] });
  const [evolution, setEvolution] = useState([]);
  const [pokeDesc, setPokeDesc] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  const typeColors = {
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
  };

  // Fonction pour extraire l'ID depuis l'URL species
  const getIdFromSpeciesUrl = (url) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  const fetchPoke = async (id) => {
    try {
      const response = await getPokemonbyId(id);
      setPokemon(response.data);

      const speciesResponse = await getPokemonSpecies(id);
      const frenchName =
        speciesResponse.data.names.find((name) => name.language.name === "fr")?.name ||
        response.data.name;

        setPokeDesc(speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === "fr")?.flavor_text || "Description non disponible");

      const frenchTypes = [];
      for (const typeInfo of response.data.types) {
        const typeResponse = await getTypeDetails(typeInfo.type.name);
        const frenchTypeName =
          typeResponse.data.names.find((name) => name.language.name === "fr")?.name ||
          typeInfo.type.name;
        frenchTypes.push(frenchTypeName);
      }

      const evolutionChain = speciesResponse.data.evolution_chain.url;
      const chain = await axios.get(evolutionChain);

      const evoData = [
        chain.data.chain.species,
        chain.data.chain.evolves_to[0]?.species,
        chain.data.chain.evolves_to[0]?.evolves_to[0]?.species,
      ].filter(Boolean);

      // On stocke nom + ID pour chaque Pokémon d'évolution
      setEvolution(
        evoData.map((species) => ({
          name: species.name,
          id: getIdFromSpeciesUrl(species.url),
        }))
      );

      setFrenchData({
        name: frenchName,
        types: frenchTypes,
      });
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      setFrenchData({
        name: pokemon.name || "",
        types: pokemon.types?.map((t) => t.type.name) || [],
      });
    }
  };

  useEffect(() => {
    fetchPoke(id);
  }, [id]);

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)">
      <Box py={12}>
        <Container maxW="6xl">
          <VStack spacing={8} align="center">
            {/* Titre */}
            <Heading
              as="h1"
              size="3xl"
              color="white"
              textAlign="center"
              fontWeight="extrabold"
              letterSpacing="3px"
              textTransform="capitalize"
            >
              {frenchData.name || pokemon.name}
              {pokeDesc && (
                <Text
                  mt={4}
                  color="gray.300"
                  textAlign="center"
                  fontSize="lg"
              textTransform="none"

                >
                  {pokeDesc}
                </Text>
              )}
            </Heading>

            {/* Image du Pokémon */}
            <Box
              bg={
                pokemon.types?.[0] ? typeColors[pokemon.types[0].type?.name] || "#A8A878" : "#A8A878"
              }
              borderRadius="xl"
              p={8}
              border="2px solid rgba(255,255,255,0.1)"
              boxShadow={`0 10px 30px rgba(${
                pokemon.types?.[0]
                  ? parseInt((typeColors[pokemon.types[0].type?.name] || "#A8A878").slice(1, 3), 16)
                  : 168
              }, ${
                pokemon.types?.[0]
                  ? parseInt((typeColors[pokemon.types[0].type?.name] || "#A8A878").slice(3, 5), 16)
                  : 168
              }, ${
                pokemon.types?.[0]
                  ? parseInt((typeColors[pokemon.types[0].type?.name] || "#A8A878").slice(5, 7), 16)
                  : 120
              }, 0.4)`}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={frenchData.name || pokemon.name}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
              />
            </Box>

            {/* Types */}
            <HStack spacing={4}>
              {pokemon.types?.map((typeInfo, index) => {
                const typeName = typeInfo.type?.name;
                const frenchTypeName = frenchData.types?.[index] || typeName;
                const typeColor = typeColors[typeName] || "#A8A878";
                return (
                  <Box
                    key={index}
                    bg={index === 0 ? typeColor : "rgba(255,255,255,0.1)"}
                    color={index === 0 ? "white" : "gray.300"}
                    px={6}
                    py={3}
                    borderRadius="full"
                    fontSize="lg"
                    fontWeight="bold"
                    textTransform="capitalize"
                    border={index !== 0 ? `2px solid ${typeColor}` : "none"}
                    boxShadow={
                      index === 0
                        ? `0 0 20px rgba(${parseInt(typeColor.slice(1, 3), 16)}, ${parseInt(
                            typeColor.slice(3, 5),
                            16
                          )}, ${parseInt(typeColor.slice(5, 7), 16)}, 0.4)`
                        : "none"
                    }
                  >
                    {frenchTypeName}
                  </Box>
                );
              })}
            </HStack>

            {/* Statistiques */}
            <Box
              bg="rgba(255,255,255,0.05)"
              borderRadius="xl"
              p={8}
              w="full"
              maxW="md"
              border="1px solid rgba(255,255,255,0.1)"
            >
              <Heading
                as="h2"
                size="xl"
                color="white"
                textAlign="center"
                mb={6}
                fontWeight="bold"
              >
                Statistiques
              </Heading>
              <VStack spacing={4} align="stretch">
                {pokemon.stats?.map((stat) => (
                  <HStack key={stat.stat.name} justify="space-between">
                    <Text color="gray.300" fontWeight="medium" textTransform="capitalize" fontSize="md">
                      {stat.stat.name.replace("-", " ")}
                    </Text>
                    <Text color="white" fontWeight="bold" fontSize="lg">
                      {stat.base_stat}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Évolutions */}
            <Box
              bg="rgba(255,255,255,0.05)"
              borderRadius="xl"
              p={8}
              w="full"
              maxW="md"
              border="1px solid rgba(255,255,255,0.1)"
              mt={4}
            >
              <Heading as="h2" size="lg" color="white" textAlign="center" mb={6} fontWeight="bold">
                Évolutions
              </Heading>

              <HStack justify="center" spacing={6} wrap="wrap">
                {evolution.map((poke, index) => (
                  <HStack key={index} spacing={3}>
                    <VStack
                      spacing={2}
                      cursor="pointer"
                      onClick={() =>{ navigate(`/pokemon/${poke.name}`),  window.scrollTo({ top: 0, behavior: 'smooth' })}}
                      _hover={{ transform: "scale(1.08)", transition: "0.2s" }}
                    >
                      <Box
                        bg="rgba(255,255,255,0.1)"
                        p={3}
                        borderRadius="full"
                        border="1px solid rgba(255,255,255,0.2)"
                      >
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                          alt={poke.name}
                          style={{ width: "80px", height: "80px" }}
                        />
                      </Box>

                      <Text color="white" fontSize="sm" fontWeight="semibold" textTransform="capitalize">
                        {poke.name}
                      </Text>
                    </VStack>

                    {index < evolution.length - 1 && <Text color="gray.400" fontSize="2xl">→</Text>}
                  </HStack>
                ))}
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default PokeDetail;