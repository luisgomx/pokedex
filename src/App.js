import { useState, useEffect } from "react";
import "./App.css";
import Container from "./components/Container";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState([]);
  const [receivedResponsesCount, setReceivedResponsesCount] = useState(0);
  const [isFiltering, setIsFiltering] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPokemonList((prevResponses) => [...prevResponses, data]);
      setReceivedResponsesCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((element) => {
          fetchData(element.url);
        });
      });

    setIsFiltering(false);
  }, []);

  useEffect(() => {
    setPokemonFilteredList(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
      )
    );
    pokemonName.length <= 0 ? setIsFiltering(false) : setIsFiltering(true);
  }, [pokemonName]);

  useEffect(() => {
    setPokemonFilteredList(pokemonList);
  }, []);

  return (
    <Container>
      <Header pokemonName={pokemonName} setPokemonName={setPokemonName} />
      <div className="p-10 flex flex-wrap justify-center w-screen">
        {pokemonFilteredList &&
          isFiltering &&
          pokemonFilteredList.map((pokemon) => (
            <PokemonCard
              name={pokemon.name}
              img={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              general={pokemon}
            />
          ))}
        {pokemonList &&
          !isFiltering &&
          pokemonList.map((pokemon) => (
            <PokemonCard
              name={pokemon.name}
              img={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              general={pokemon}
            />
          ))}
      </div>
      {console.log(pokemonList && !isFiltering)}
    </Container>
  );
}

export default App;
