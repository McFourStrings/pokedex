import { Button, Card, CardBody, CardFooter, Image, Text, Heading, Box, HStack, VStack, Badge } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
import { getPokemonDetails, getPokemonSpecies, getTypeDetails } from "../service/pokedex";
import {  useEffect, useState } from "react";



const PokeCard = ({pokemon, compact = false}) =>{

const [pokeDetails, setPokeDetails] = useState({});
const [frenchData, setFrenchData] = useState({ name: '', types: [] });
const navigate = useNavigate();

 const fetchDetail = async () => {

        try {
            // Récupérer les détails du Pokémon
            const response = await getPokemonDetails(pokemon.id);
            setPokeDetails(response.data);

            // Récupérer les données en français
            const speciesResponse = await getPokemonSpecies(pokemon.id);
            const frenchName = speciesResponse.data.names.find(name => name.language.name === 'fr')?.name || pokemon.name;

            // Récupérer les noms français des types
            const frenchTypes = [];
            for (const typeInfo of response.data.types) {
                const typeResponse = await getTypeDetails(typeInfo.type.name);
                const frenchTypeName = typeResponse.data.names.find(name => name.language.name === 'fr')?.name || typeInfo.type.name;
                frenchTypes.push(frenchTypeName);
            }

            setFrenchData({
                name: frenchName,
                types: frenchTypes
            });

        } catch (error) {
            console.error(error);
            // En cas d'erreur, utiliser les données anglaises
            setFrenchData({
                name: pokemon.name,
                types: pokeDetails.types?.map(t => t.type.name) || []
            });
        }
    };

    useEffect(() => {
        fetchDetail(pokemon.id);
    }, [])

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

    const primaryType = pokeDetails.types?.[0]?.type.name || "normal";
    const primaryTypeColor = typeColors[primaryType] || "#A8A878";

return(
     <Card 
     onClick={()=>navigate(`/pokemon/${pokemon.id}`)}
        maxW="sm" 
        overflow="hidden"
        bg="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
        borderRadius="xl"
        border="2px solid rgba(255,255,255,0.1)"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: `0 10px 30px rgba(${parseInt(primaryTypeColor.slice(1, 3), 16)}, ${parseInt(primaryTypeColor.slice(3, 5), 16)}, ${parseInt(primaryTypeColor.slice(5, 7), 16)}, 0.4)`,
          borderColor: primaryTypeColor
        }}
      >
        {/* En-tête avec couleur du type */}
        <Box 
          bg={primaryTypeColor}
          h="140px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            h="100%"
            objectFit="contain"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
          />
        </Box>

        <CardBody gap="4">
          <VStack spacing={4} align="stretch">
            {/* ID et nom */}
            <VStack spacing={2} align="start">
              <Text fontSize="xs" color="gray.400" fontWeight="bold" letterSpacing="2px">
                #{String(pokemon.id).padStart(3, "0")}
              </Text>
              <Heading 
                size={compact ? "sm" : "lg"}
                textTransform="capitalize"
                color="white"
                fontWeight="bold"
              >
                {frenchData.name || pokemon.name}
              </Heading>
            </VStack>

            {/* Types */}
            <HStack spacing={2}>
              <Badge 
                bg={primaryTypeColor}
                color="white"
                textTransform="capitalize"
                fontSize="xs"
                px={3}
                py={1}
                borderRadius="full"
                fontWeight="bold"
              >
                {frenchData.types?.[0] || pokeDetails.types?.[0]?.type.name}
              </Badge>
              {pokeDetails.types?.[1] && (
                <Badge 
                  bg="rgba(255,255,255,0.1)"
                  color="gray.300"
                  textTransform="capitalize"
                  fontSize="xs"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontWeight="bold"
                  border="1px solid rgba(255,255,255,0.2)"
                >
                  {frenchData.types?.[1] || pokeDetails.types?.[1]?.type.name}
                </Badge>
              )}
            </HStack>
          </VStack>
        </CardBody>
      </Card>
)


}

export default PokeCard;