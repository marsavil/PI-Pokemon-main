import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input){
  let errors = {};
  if (input.name === ''){
    errors.name = 'A name is required';
  }else if (input.image === ''){
    errors.image = 'You must provide an image url'
  }else if ( input.hp < 0 || input.hp > 999){
    errors.hp = 'You must enter a valid number from 0 to 999'
  }else if (input.attack < 0 || input.attack > 999){
    errors.attack = 'You must enter a valid number from 0 to 999'
  }else if (input.defense < 0 || input.defense > 999){
    errors.defense = 'You must enter a valid number from 0 to 999'
  }else if (input.speed < 0 || input.speed > 999){
    errors.speed = 'You must enter a valid number from 0 to 999'
  }else if (input.weight < 0 || input.weight > 999){
    errors.weight = 'You must enter a valid number from 0 to 999'
  }else if (input.height < 0 || input.height > 999){
    errors.height = 'You must enter a valid number from 0 to 999'
  }else if (input.types === []){
    errors.types = 'You must select, at least, one valid pokemon type'
  }
  return errors;
}
export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory()
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

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      input,
      [e.target.name]: e.target.value
    }))
    console.log(input)
    console.log(errors)
  }
  function handleSelect(e){
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    if (errors!=={}){
      console.log(input)
      dispatch(postPokemon(input))
      setInput({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: []
      })
    }else {
      e.preventDefault()
      alert('Check the data you have entered')
    }
    
    history.push('/home')
  }
  function handleDelete(el){
    setInput({
      ...input,
      types: input.types.filter(t => t !== el)
    })
  }

  return (
    <div>
      <Link to="/home">
        <button>Return</button>
      </Link>
      <h1>Create Your Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input type="text" value={input.name} name="name"  required onChange={(e) => handleChange(e)} />
          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>
        <div>
          <label>Image: </label>
          <input type="text" value={input.image} name="image" required onChange={(e) => handleChange(e)}/>
          {errors.image && (
            <p className="error">{errors.image}</p>
          )}
        </div>
        <div>
          <label>Hp: </label>
          <input type="number" value={input.hp} name="hp" required onChange={(e) => handleChange(e)}/>
          {errors.hp && (
            <p className="error">{errors.hp}</p>
          )}
        </div>
        <div>
          <label>Attack: </label>
          <input type="number" value={input.attack} name="attack" required onChange={(e) => handleChange(e)}/>
          {errors.attack && (
            <p className="error">{errors.attack}</p>
          )}
        </div>
        <div>
          <label>Defense: </label>
          <input type="number" value={input.defense} name="defense" required onChange={(e) => handleChange(e)}/>
          {errors.defense && (
            <p className="error">{errors.defense}</p>
          )}
        </div>
        <div>
          <label>Speed: </label>
          <input type="number" value={input.speed} name="speed" required onChange={(e) => handleChange(e)}/>
          {errors.speed && (
            <p className="error">{errors.speed}</p>
          )}
        </div>
        <div>
          <label>Height: </label>
          <input type="number" value={input.height} name="height" required onChange={(e) => handleChange(e)}/>
          {errors.height && (
            <p className="error">{errors.height}</p>
          )}
        </div>
        <div>
          <label>Weight: </label>
          <input type="number" value={input.weight} name="weight" required onChange={(e) => handleChange(e)}/>
          {errors.weight && (
            <p className="error">{errors.weight}</p>
          )}
        </div>
        <label>Types: </label>
        <select required onChange={(e) => handleSelect(e)}>
          {errors.types && (
            <p className="error">{errors.types}</p>
          )}
          {types.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))
          }
        </select>
        <ul><li>{input.types.map(t => t +', ')}</li></ul>
        <button type='submit'>Create Pokemon</button>
      </form>
      {input.types.map(t => 
        <div className= 'delTypes'>
          <p>{t}</p>
          <button className="buttonX" onClick={() => handleDelete(t)}>X</button>
        </div>
        )}
    </div>
  );
}
