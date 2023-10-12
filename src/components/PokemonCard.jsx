function PokemonCard(props) {
  const types = {
    grass: "bg-lime-600",
    fire: "bg-red-600",
    water: "bg-blue-400",
    bug: "bg-lime-200",
  };

  const handleClick = () => {
    console.log(props.general);
  };

  const checkType = (type) => {
    switch (type) {
      case "fire":
        return types.fire;
      case "grass":
        return types.grass;
      case "water":
        return types.water;
      default:
        return types.bug;
        break;
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      className="bg-white h-80 w-60 m-5 rounded-xl p-5 font-press"
    >
      <div className="text-center flex flex-wrap justify-center">
        <p className="w-screen">{props.name}</p>
        <div
          className={`${checkType(props.type)} rounded-full text-xs w-1/2 mt-3`}
        >
          <p className="p-1">{props.type}</p>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <img className="h-36" src={props.img} alt={props.name} />
      </div>
    </div>
  );
}

export default PokemonCard;
