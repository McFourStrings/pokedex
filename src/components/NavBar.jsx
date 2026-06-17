import { Box, Container, Flex, Input, Button, Wrap, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, VStack } from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";
import { getPokemonSpeciesnoId } from "../service/pokedex";



export default function NavBar() {
    const navigate = useNavigate();



const handleSubmit = (e) => {

    e.preventDefault();
    const value = e.target.search.value;

    navigate("/search/" + value.toLowerCase());
};


    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
    <Box
        bg="linear-gradient(90deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)"
        borderBottom="2px solid rgba(59, 130, 246, 0.3)"
        py={4}
        position="sticky"
        top={0}
        zIndex={10}
        width="100%"
    >
        <Container maxW="6xl">
            <Flex
                direction="column"
                gap={4}
            >
                {/* Input de recherche */}
                <Flex as="form" onSubmit={handleSubmit} gap={2} align="center">
                    <Input
                        name="search"
                        type="text"
                        placeholder="Rechercher un pokémon..."
                        bg="rgba(255,255,255,0.08)"
                        color="white"
                        borderColor="rgba(59, 130, 246, 0.5)"
                        _placeholder={{ color: "gray.400" }}
                        _focus={{
                            bg: "rgba(255,255,255,0.12)",
                            borderColor: "rgba(59, 130, 246, 1)"
                        }}
                        borderRadius="lg"
                        size="md"
                        flex="1"
                    />
                    <IconButton
                        type="submit"
                        aria-label="Rechercher"
                        bg="rgba(59, 130, 246, 1)"
                        color="white"
                        _hover={{ bg: "rgba(59, 130, 246, 0.9)" }}
                        borderRadius="lg"
                        size="md"
                    >
                        <SearchIcon />
                    </IconButton>
                </Flex>


                {/* Boutons Catégories */}
                {/* Desktop menu */}
                <Wrap spacing={2} justify="space-between" display={{ base: "none", md: "flex" }}>
                    {/* Tous les Pokémon */}
                    <Button
                        onClick={() => navigate("/")}
                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Tous
                    </Button>

                    {/* Gen 1 */}
                    <Button
                        onClick={() => navigate("/gen1")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 1
                    </Button>

                    {/* Gen 2 */}
                    <Button
                        onClick={() => navigate("/gen2")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 2
                    </Button>

                    {/* Gen 3 */}
                    <Button
                        onClick={() => navigate("/gen3")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 3
                    </Button>

                    {/* Gen 4 */}
                    <Button
                        onClick={() => navigate("/gen4")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 4
                    </Button>

                    {/* Gen 5 */}
                    <Button
                        onClick={() => navigate("/gen5")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 5
                    </Button>

                    {/* Gen 6 */}
                    <Button
                        onClick={() => navigate("/gen6")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 6
                    </Button>

                    {/* Gen 7 */}
                    <Button
                        onClick={() => navigate("/gen7")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 7
                    </Button>

                    {/* Gen 8 */}
                    <Button
                        onClick={() => navigate("/gen8")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 8
                    </Button>

                    {/* Gen 9 */}
                    <Button
                        onClick={() => navigate("/gen9")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Gen 9
                    </Button>

                    {/* Mega */}
                    <Button
                        onClick={() => navigate("/mega")}

                        bg="rgba(255,255,255,0.1)"
                        color="white"
                        borderRadius="lg"
                        _hover={{ bg: "rgba(59, 130, 246, 0.3)" }}
                        flex={{ base: "1 1 45%", md: "1 1 calc(9% - 8px)" }}
                    >
                        Mega
                    </Button>
                </Wrap>

                {/* Mobile hamburger */}
                <IconButton
                    aria-label="Menu"
                    icon={<HamburgerIcon />}
                    variant="ghost"
                    color="white"
                    display={{ base: "inline-flex", md: "none" }}
                    onClick={onOpen}
                />

                <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent bg="rgba(31,41,55,0.95)" color="white">
                        <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                        <DrawerBody>
                            <VStack spacing={2} align="stretch">
                                {/* Replicate the same buttons as in the Wrap */}
                                <Button onClick={() => {navigate("/"); onClose();}} bg="rgba(255,255,255,0.1)" color="white" borderRadius="lg" _hover={{ bg: "rgba(59, 130, 246, 0.3)" }} flex="1">
                                    Tous
                                </Button>
                                {/* Generate other generation buttons programmatically to avoid duplication */}
                                {Array.from({length:9},(_,i)=>i+1).map(gen=> (
                                    <Button key={gen} onClick={()=>{navigate(`/gen${gen}`); onClose();}} bg="rgba(255,255,255,0.1)" color="white" borderRadius="lg" _hover={{ bg: "rgba(59, 130, 246, 0.3)" }} flex="1">
                                        Gen {gen}
                                    </Button>
                                ))}
                                <Button onClick={()=>{navigate("/mega"); onClose();}} bg="rgba(255,255,255,0.1)" color="white" borderRadius="lg" _hover={{ bg: "rgba(59, 130, 246, 0.3)" }} flex="1">
                                    Mega
                                </Button>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Container>
    </Box>
);
}
