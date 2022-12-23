import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id, "id");

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch]);

  const pokemon = useSelector((state) => state.pokemonDetails);
  const types = pokemon.types;
  console.log(pokemon, "pokemon");
  console.log(types, "Types");
  return (
    <div>
      <div>
        <img src={pokemon.image} alt="" width="200px" height="200px" />
        <h1>Name: {pokemon.name}</h1>
        <h2>Pokemon ID: {pokemon.id}</h2>
        {/* <h3>
          Types :{" "}
          {types.map((t) => {
            return <li>{t.name}</li>;
          })}
        </h3> */}
        <div>
          <h3>STATS</h3>
          <h4>Health Poins: {pokemon.hp}</h4>
          <h4>Attack Force: {pokemon.attack}</h4>
          <h4>Defense Force: {pokemon.defense}</h4>
          <h4>Speed: {pokemon.speed}</h4>
        </div>
        <div>
          <h3>BODY MASS</h3>
          <h4>Weight: {pokemon.weight}</h4>
          <h4>Height: {pokemon.height}</h4>
        </div>
        
      </div>
      <Link to="/home">
        <button>Return Home</button>
      </Link>
    </div>
  );
}
