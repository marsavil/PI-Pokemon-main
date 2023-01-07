import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Detail.module.css";
import image1 from "../images/muestra1.png";
import image2 from "../images/muestra2.png";
import image3 from "../images/muestra3.png";
import bug from "../images/bug.png";
import dark from "../images/dark.png";
import dragon from "../images/dragon.png";
import electric from "../images/electric.png";
import fairy from "../images/fairy.png";
import fighting from "../images/fighting.png";
import fire from "../images/fire.png";
import flying from "../images/flying.png";
import ghost from "../images/ghost.png";
import grass from "../images/grass.png";
import ground from "../images/ground.png";
import ice from "../images/ice.png";
import normal from "../images/normal.png";
import poison from "../images/poison.png";
import psychic from "../images/psychic.png";
import rock from "../images/rock.png";
import shadow from "../images/shadow.png";
import steel from "../images/steel.png";
import water from "../images/water.png";
import unknown from "../images/unknown.png";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id, "id");

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch]);

  const pokemon = useSelector((state) => state.pokemonDetails);

  console.log(pokemon, "pokemon");
  return (
    <div className={styles.preview}>
      <div className={styles.headPrev}>
        <h1>{pokemon.name}</h1>
        <h1>{pokemon.hp} HP</h1>
      </div>
      <div className={styles.imageTypePrev}>
        <div className={styles.imageContainerPrev}>
          <img src={pokemon.image} alt="" height="200px" width="200px" />
        </div>
        <div className={styles.typesContainer}>
          <ul>
            <li className={styles.types}>
              POKEMON:{" "}
              {pokemon.types
                ? pokemon.types.map((t) => t.name + ", ")
                : "loading..."}
            </li>
          </ul>
          <h3 className={styles.id}>POKEMON ID: {pokemon.id}</h3>
        </div>
      </div>
      <div className={styles.abilities}>
        <div className={styles.attackPrev}>
          <h3>ATTACK: {pokemon.attack}</h3>
        </div>
        <div className={styles.defensePrev}>
          <h3>DEFENSE: {pokemon.defense}</h3>
        </div>
        <div className={styles.speedPrev}>
          <h3>SPEED: {pokemon.speed}</h3>
        </div>
      </div>
      <div className={styles.mass}>
        <div className={styles.heightPrev}>
          <h3>HEIGHT: {pokemon.height}</h3>
        </div>
        <div className={styles.weightPrev}>
          <h3>WEIGHT: {pokemon.weight}</h3>
        </div>
      </div>
      <Link to="/home">
        <button className={styles.btn}>Return Home</button>
      </Link>
    </div>
  );
}
