import { useState, useEffect } from "react";
import "./App.css";
import Container from "./components/Container";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const pokemons = data.results;

        const pokemonDetails = await Promise.all(
          pokemons.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) {
              throw new Error("Network response was not ok");
            }
            const detailData = await detailResponse.json();
            return detailData;
          })
        );
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();

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
        {pokemonFilteredList.length === 0 && (
          <p className="font-press text-xl">No Pókemons found :(</p>
        )}
      </div>
    </Container>
  );
}

export default App;
