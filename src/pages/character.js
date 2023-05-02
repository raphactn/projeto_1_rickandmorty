import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/Card";

const character = () => {
  const router = useRouter();
  const [person, setPerson] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/${router.query.characterId}`
      )
      .then((res) => {
        setPerson(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.query.characterId]);

  return person && <Card personagem={person} pathname={'/'} />;
};

export default character;
