import {
  Container,
  SimpleGrid,
  Input,
  Select,
  Flex,
  Image,
  Center,
  IconButton,
  Text,
  Button,
} from "@chakra-ui/react";
import { Card } from "@/components/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const home = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(0);
  const [activeFavorits, setActiveFavorits] = useState(false);

  useEffect(() => {
    axios
      .get(
        activeFavorits
          ? `https://rickandmortyapi.com/api/character/${localStorage["favorits"]}`
          : `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}&status=${status}`
      )
      .then((res) => {
        if (res.data.results || res.data.info) {
          setInfo(res.data.info.pages);
          setResults(res.data.results);
        } else {
          setInfo(0);
          setResults(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, status, page, activeFavorits]);

  //Metodo de pesquisa de array.

  // const filterResults = results.filter((item) => {
  //   const name = item.name.toLocaleLowerCase();
  //   if (status) {
  //     return (
  //       name.includes(search.toLocaleLowerCase()) && item.status === status
  //     );
  //   }
  //   return name.includes(search.toLocaleLowerCase());
  // });

  return (
    <Container maxW={"1400px"} p={10}>
      <Center>
        <Image src="/logo.png" w={"100%"} maxW={"400"} />
      </Center>
      <Flex gap={2} alignItems={"center"}>
        <Input
          my={10}
          placeholder="Search characters..."
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          placeholder="selecione"
          maxW="200px"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </Select>
        <Button onClick={() => setActiveFavorits(!activeFavorits)}>
          Favoritos
        </Button>
      </Flex>
      <SimpleGrid columns={2} spacing={5}>
        {results.map((item) => (
          <Card key={item.id} personagem={item} />
        ))}
      </SimpleGrid>

      <Flex gap={2} my={5} justifyContent={"end"} alignItems={"center"}>
        <Text mr="10">{`Page ${page} de ${info}`}</Text>
        <IconButton
          isDisabled={page === 1}
          icon={<ChevronLeftIcon />}
          onClick={() => setPage(page - 1)}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={() => setPage(page + 1)}
        />
      </Flex>
    </Container>
  );
};
export default home;
