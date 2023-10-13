import { useState, useEffect } from "react";
import "./App.css";
import Container from "./components/Container";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import { Audio, Circles, Rings, ProgressBar, Dna } from "react-loader-spinner";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    setTimeout(() => {
      fetchPokemonData();
    }, 2000);

    setIsFiltering(false);
  }, []);

  useEffect(() => {
    setPokemonFilteredList(
      pokemonList.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .trim()
          .includes(pokemonName.toLowerCase().trim())
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
      {loading && (
        <div className="flex justify-center w-screen">
          <Dna
            visible={true}
            height="150"
            width="150"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}

      <div className="p-2 flex flex-wrap justify-center w-screen">
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
        {pokemonFilteredList.length === 0 && !loading && (
          <p className="font-press text-md text-center mt-10">
            No Pókemons found :(
          </p>
        )}
      </div>
    </Container>
  );
}

export default App;
