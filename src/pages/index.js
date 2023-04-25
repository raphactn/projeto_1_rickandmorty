import { Card } from "@/components/Card";
import axios from "axios";
import { useState, useEffect } from "react";

const home = () => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        setResults(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(results);
  return (
    <div>
      {results.map((item) => (
        <Card key={item.id} personagem={item}/>
      ))}
    </div>
  );
};
export default home;
