function PokemonCard(props) {
  return (
    <div className="bg-white h-60 w-60 m-5 rounded-xl p-5 font-press">
      <p className="text-center">{props.name}</p>
      <div className="flex justify-center">
        <img className="h-auto" src={props.img} alt={props.name} />
      </div>
    </div>
  );
}

export default PokemonCard;
