function Header() {
  return (
    <div className="bg-red-400 w-screen rounded-br-xl rounded-bl-xl h-40 p-12 flex-col text-center">
      <div className="font-press text-white tracking-widest">
        Which Pókemon are you looking for? :)
      </div>
      <div className="mt-2">
        <input
          className="font-press text-lg text-center bg-gray-100 appearance-none border-2 border-gray-200 rounded-full w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
          type="text"
          placeholder="name goes here"
        />

        {/* <button>Search</button> */}
      </div>
    </div>
  );
}

export default Header;
