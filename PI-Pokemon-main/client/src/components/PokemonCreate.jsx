import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory()
  const types = useSelector((state) => state.types);
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
    console.log(input)
  }
  function handleSelect(e){
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    console.log(input)
    dispatch(postPokemon(input))
    alert('Pokemon Created Succesfully')
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
          <label>Name:</label>
          <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Hp:</label>
          <input type="text" value={input.hp} name="hp" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Attack:</label>
          <input type="text" value={input.attack} name="attack" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Defense:</label>
          <input type="text" value={input.defense} name="defense" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Speed:</label>
          <input type="text" value={input.speed} name="speed" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Height:</label>
          <input type="text" value={input.height} name="height" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Weight:</label>
          <input type="text" value={input.weight} name="weight" onChange={(e) => handleChange(e)}/>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {types.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))
          }
        </select>
        <ul><li>{input.types.map(t => t +', ')}</li></ul>
        <button type='submit'>Create Pokemon</button>
      </form>
      {console.log(input.types)}
      {input.types.map(t => 
        <div className= 'delTypes'>
          <p>{t}</p>
          <button className="buttonX" onClick={() => handleDelete(t)}>X</button>
        </div>
        )}
    </div>
  );
}
