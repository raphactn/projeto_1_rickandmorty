import Image from "next/image";
import { Flex, Heading, Box, Text, IconButton, Button } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/router";

export const Card = ({ personagem, pathname }) => {
  let arrayId = [];
  const [change, setChange] = useState(false);
  const router = useRouter();

  const handleFavorit = (id) => {
    setChange((f) => !f);
    arrayId = JSON.parse(localStorage.getItem("favorits")) || [];
    if (arrayId.includes(id)) {
      arrayId.splice(arrayId.indexOf(id), 1);
      localStorage.setItem("favorits", JSON.stringify(arrayId));
    } else {
      arrayId.push(id);
      localStorage.setItem("favorits", JSON.stringify(arrayId));
    }
  };

  return (
    <>
      <Flex
        gap={3}
        bg="gray.100"
        rounded={"md"}
        justifyContent={"space-between"}
      >
        <Flex>
          <Image
            src={personagem.image}
            width={"200"}
            height={"200"}
            alt={personagem.name}
          />
          <Box p={5}>
            <Heading size="md" mb={5}>
              {personagem.name}
            </Heading>
            <Text>{personagem.species}</Text>
            <Flex gap={2} alignItems={"center"}>
              <Text>{personagem.status}</Text>
              <Box
                w="10px"
                h="10px"
                rounded={"full"}
                bg={personagem.status === "Alive" ? "green.500" : "red.500"}
              />
            </Flex>
            <Text>{personagem.location?.name}</Text>
            <Button
              mt={5}
              bg="green.500"
              color={"white"}
              colorScheme="green"
              onClick={() =>
                router.replace({
                  pathname,
                  query: { characterId: personagem.id },
                })
              }
            >
              {pathname === "/character" ? "Acessar" : "Voltar"}
            </Button>
          </Box>
        </Flex>
        <IconButton
          variant={"ghost"}
          onClick={() => handleFavorit(personagem.id)}
          icon={
            process.browser &&
            localStorage.getItem("favorits") &&
            localStorage.getItem("favorits").includes(personagem.id) ? (
              <AiFillHeart fontSize={"20px"} color="red" />
            ) : (
              <AiOutlineHeart fontSize={"20px"} color="red" />
            )
          }
        />
      </Flex>
    </>
  );
};
