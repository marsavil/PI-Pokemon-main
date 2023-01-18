import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Detail.module.css";
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
import ball from "../images/ball.png"

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
        {!pokemon.types ? <img src={unknown} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'bug' ? <img src={bug} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'dark' ? <img src={dark} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'dragon' ? <img src={dragon} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'electric' ? <img src={electric} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'fairy' ? <img src={fairy} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'fighting' ? <img src={fighting} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'fire' ? <img src={fire} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'flying' ? <img src={flying} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'ghost' ? <img src={ghost} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'grass' ? <img src={grass} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'ground' ? <img src={ground} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'ice' ? <img src={ice} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'normal' ? <img src={normal} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'poison' ? <img src={poison} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'psychic' ? <img src={psychic} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'rock' ? <img src={rock} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'shadow' ? <img src={shadow} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'steel' ? <img src={steel} alt="" height="40px" width="40px" />
        :pokemon.types[0].name === 'water' ? <img src={water} alt="" height="40px" width="40px" />
        :<img src={unknown} alt="" height="40px" width="40px" /> }
      </div>
      <div className={styles.imageTypePrev}>
        <div className={styles.imageContainerPrev}>
          {pokemon.image ? <img src={pokemon.image} alt="" height="200px" width="200px" />
          : <img src={ball} alt="" height="200px" width="200px" />}
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
        <button className={styles.btn}>Home</button>
      </Link>
    </div>
  );
}
