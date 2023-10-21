function PokemonCard(props) {
  const types = {
    grass: "bg-lime-600",
    fire: "bg-red-600",
    water: "bg-blue-400",
    bug: "bg-lime-200",
    normal: "bg-gray-200",
    poison: "bg-purple-400",
    ground: "bg-amber-900 text-white",
    electric: "bg-yellow-300",
  };

  const handleClick = () => {
    console.log(props.general);
  };

  const capitalizeFirstLetter = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const checkType = (type) => {
    switch (type) {
      case "fire":
        return types.fire;
      case "grass":
        return types.grass;
      case "water":
        return types.water;
      case "normal":
        return types.normal;
      case "poison":
        return types.poison;
      case "ground":
        return types.ground;
      case "electric":
        return types.electric;
      default:
        return types.bug;
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      className="bg-white h-80 w-80 m-8 rounded-xl pt-5 font-press lg:w-60"
    >
      <div className="text-center flex flex-wrap justify-center">
        <p className="w-screen">{capitalizeFirstLetter(props.name)}</p>
        <div
          className={`${checkType(props.type)} rounded-full text-xs w-2/3 mt-3`}
        >
          <p className="p-1">{props.type}</p>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <img className="h-36" src={props.img} alt={props.name} />
      </div>
      <div
        className=" mt-2 bg-emerald-100 p-5 rounded-bl-xl rounded-br-xl h-auto"
        style={{ fontSize: "0.50rem" }}
      >
        <div className="flex justify-center">
          <p>
            Weight:
            <span className="">{props.general.weight}lb</span>
          </p>
          <div className="m-1"></div>
          <p>
            Height:<span className="">{props.general.height}"</span>
          </p>
        </div>
        <div className="mt-5">
          <p>Abilities:</p>
          <ul className="list-disc text-center">
            {props.general.abilities.map((ability) => (
              <li>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
