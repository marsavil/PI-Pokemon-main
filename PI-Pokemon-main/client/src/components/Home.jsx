import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getTypes())
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  return (
    <div>
      <Link to="/pokemon">Create Pokemon</Link>
      <h1>The Ultimate Pokemon App</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Restore
      </button>
      <div>
        <select>
          <option value="aToz">A-Z</option>
          <option value="zToa">Z-A</option>
        </select>
        <select>
          <option value="asc">-/+</option>
          <option value="desc">+/-</option>
        </select>
        <select>
          <option value="all">All</option>
          <option value="api">Our Pokemons</option>
          <option value="db">Created Pokemons</option>
        </select>
        <select>
          <option value="allTypes">All Types</option>
          <option value="selectedtype">Select Type</option>
        </select>
        <div>
          {allPokemons &&
            allPokemons.map((p) => {
              return (
                <div key={p.id}>
                  <Card name={p.name} image={p.image} types={p.types} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
