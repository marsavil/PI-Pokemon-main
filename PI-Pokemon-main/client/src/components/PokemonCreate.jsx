import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
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
import styles from "../styles/PokemonCreate.module.css";
import capitalize from "../auxiliar_functions/capitalize";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "A name is required";
  } else if (!input.image) {
    errors.image = "You must select an image";
  } else if (input.hp < 0 || input.hp > 999 || !input.hp) {
    errors.hp = "You must enter a valid number from 0 to 999";
  } else if (input.attack < 0 || input.attack > 999 || !input.hp) {
    errors.attack = "You must enter a valid number from 0 to 999";
  } else if (input.defense < 0 || input.defense > 999|| !input.defense) {
    errors.defense = "You must enter a valid number from 0 to 999";
  } else if (input.speed < 0 || input.speed > 999 || !input.speed) {
    errors.speed = "You must enter a valid number from 0 to 999";
  } else if (input.weight < 0 || input.weight > 999 || !input.weight) {
    errors.weight = "You must enter a valid number from 0 to 999";
  } else if (input.height < 0 || input.height > 999 || !input.hp) {
    errors.height = "You must enter a valid number from 0 to 999";
  } else if (input.types === []) {
    errors.types = "You must select, at least, one valid pokemon type";
  }
  return errors;
}
export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
    console.log(errors);
  }
  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }
  function handleSelectedImage(e) {
    setInput({
      ...input,
      image: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (errors !== {}) {
      console.log(input);
      dispatch(postPokemon(input));
      setInput({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
      });
    } else {
      e.preventDefault();
      alert("Check the data you have entered");
    }

    history.push("/home");
  }
  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== el),
    });
  }
  console.log(errors)
  console.log(errors.types)

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Link to="/home">
          <button className={styles.btnHome}>Return</button>
        </Link>
        <h1>Create Your Pokemon</h1>
      </div>
      <div className={styles.form}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              required
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div>
            |<label>Image: </label>
            <select required onChange={(e) => handleSelectedImage(e)}>
              <option>Select an image</option>
              <option value={image1}>Image 1</option>
              <option value={image2}>Image 2</option>
              <option value={image3}>Image 3</option>
            </select>
            {errors.image && <p className={styles.error}>{errors.image}</p>}
          </div>
          <div>
            <label>Hp: </label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              required
              onChange={(e) => handleChange(e)}
            />
            {errors.hp && <p className={styles.error}>{errors.hp}</p>}
          </div>
          <div>
            <label>Attack: </label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              required
              onChange={(e) => handleChange(e)}
            />
            {errors.attack && <p className={styles.error}>{errors.attack}</p>}
          </div>
          <div>
            <label>Defense: </label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              required
              onChange={(e) => handleChange(e)}
            />
            {errors.defense && <p className={styles.error}>{errors.defense}</p>}
          </div>
          <div>
            <label>Speed: </label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              required
              onChange={(e) => handleChange(e)}
            />
            {errors.speed && <p className={styles.error}>{errors.speed}</p>}
          </div>
          <div>
            <label>Height: </label>
            <input
              type="number"
              value={input.height}
              name="height"
              required
              onChange={(e) => handleChange(e)}
            />
            {errors.height && <p className={styles.error}>{errors.height}</p>}
          </div>
          <div>
            <label>Weight: </label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              required
              onChange={(e) => handleChange(e)}
            />
            {errors.weight && <p className={styles.error}>{errors.weight}</p>}
          </div>
          <label>Types: </label>
          <select required onChange={(e) => handleSelect(e)}>
            <option>Select one or more types</option>
            {errors.types && <p className={styles.error}>{errors.types}</p>}
            {types.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
          </select>
          {input.types.length? <button type="submit">Create Pokemon</button> :
          <p className={styles.error}>You must select, at least, one valid pokemon type</p> }
          
        </form>
      </div>
      <div className={styles.preview}>
        <div className={styles.headPrev}>
          <h2>{input.name}</h2>
          <h2>{input.hp} HP</h2>
          {input.types.includes("bug") ? (
            <img src={bug} alt="" height="40px" width="40px" />
          ) : input.types.includes("dark") ? (
            <img src={dark} alt="" height="40px" width="40px" />
          ) : input.types.includes("dragon") ? (
            <img src={dragon} alt="" height="40px" width="40px" />
          ) : input.types.includes("electric") ? (
            <img src={electric} alt="" height="40px" width="40px" />
          ) : input.types.includes("fairy") ? (
            <img src={fairy} alt="" height="40px" width="40px" />
          ) : input.types.includes("fighting") ? (
            <img src={fighting} alt="" height="40px" width="40px" />
          ) : input.types.includes("fire") ? (
            <img src={fire} alt="" height="40px" width="40px" />
          ) : input.types.includes("flying") ? (
            <img src={flying} alt="" height="40px" width="40px" />
          ) : input.types.includes("ghost") ? (
            <img src={ghost} alt="" height="40px" width="40px" />
          ) : input.types.includes("grass") ? (
            <img src={grass} alt="" height="40px" width="40px" />
          ) : input.types.includes("ground") ? (
            <img src={ground} alt="" height="40px" width="40px" />
          ) : input.types.includes("ice") ? (
            <img src={ice} alt="" height="40px" width="40px" />
          ) : input.types.includes("normal") ? (
            <img src={normal} alt="" height="40px" width="40px" />
          ) : input.types.includes("poison") ? (
            <img src={poison} alt="" height="40px" width="40px" />
          ) : input.types.includes("psychic") ? (
            <img src={psychic} alt="" height="40px" width="40px" />
          ) : input.types.includes("rock") ? (
            <img src={rock} alt="" height="40px" width="40px" />
          ) : input.types.includes("shadow") ? (
            <img src={shadow} alt="" height="40px" width="40px" />
          ) : input.types.includes("steel") ? (
            <img src={steel} alt="" height="40px" width="40px" />
          ) : input.types.includes("water") ? (
            <img src={water} alt="" height="40px" width="40px" />
          ) : (
            <img src={unknown} alt="" height="40px" width="40px" />
          )}
        </div>
        <div className={styles.imageTypePrev}>
          <div className={styles.imageContainerPrev}>
            <img src={input.image} alt="" height="200px" width="200px" />
          </div>
          <div className={styles.typesContainer}>
            <ul>
              <li className={styles.types}>
                POKEMON: {input.types.map((t) => t + " ")}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.abilities}>
          <div className={styles.attackPrev}>
            <h3>ATTACK: {input.attack}</h3>
          </div>
          <div className={styles.defensePrev}>
            <h3>DEFENSE: {input.defense}</h3>
          </div>
          <div className={styles.speedPrev}>
            <h3>SPEED: {input.speed}</h3>
          </div>
        </div>
        <div className={styles.mass}>
          <div className={styles.heightPrev}>
            <h3>HEIGHT: {input.height}</h3>
          </div>
          <div className={styles.weightPrev}>
            <h3>WEIGHT: {input.weight}</h3>
          </div>
        </div>
        {input.types.map((t) => (
          <div className={styles.removeTypes}>
            <h2>REMOVE TYPES</h2>
            <p className={styles.type}>{t}</p>
            <button className={styles.buttonX} onClick={() => handleDelete(t)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
