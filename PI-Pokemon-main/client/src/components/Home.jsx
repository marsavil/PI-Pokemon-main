import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterPokemonsByOrigin, orderByName, sortByType, orderByAttack } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.filteredPokemons);
  const allTypes = useSelector((state) => state.types);
  const [order, setOrder]= useState('')
  const [currentPage, setCurrentPage] = useState(1) ;
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pagenNumber) => {
    setCurrentPage(pagenNumber)
  }


  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);




  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterOrigin(e){
    e.preventDefault()
    dispatch(filterPokemonsByOrigin(e.target.value))
  }
  function handleOrderByName(e){
    e.preventDefault();
    dispatch (orderByName(e.target.value));
    setCurrentPage(1)
    setOrder(`Ordered from ${e.target.value}`)
  }
  function handleOrderByAttack(e){
    e.preventDefault();
    dispatch (orderByAttack(e.target.value));
    setCurrentPage(1)
    setOrder(`Ordered from ${e.target.value}`)
  }
  function handleType(e){
    e.preventDefault();
    dispatch (sortByType(e.target.value));
    setCurrentPage(1)
    setOrder(`Sorted by type ${e.target.value}`)
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
        <select onChange={e =>handleOrderByName(e)}>
          <option value="A-to-Z">A-Z</option>
          <option value="Z-to-A">Z-A</option>
        </select>
        <select onChange={e =>handleOrderByAttack(e)}>
          <option value="asc">Min_Attack</option>
          <option value="desc">Max_Attack</option>
        </select>
        <select onChange={e =>handleFilterOrigin(e)}>
          <option value="all">All</option>
          <option value="api">Our Pokemons</option>
          <option value="db">Created Pokemons</option>
        </select>
        <select onChange={e =>handleType(e)}>
          <option value="allTypes">All Types</option>

          <Fragment>
            {allTypes &&
              allTypes.map((t) => {
                return (
                  <Fragment key= {t.id}>
                    <option value={t.name}>{t.name}</option>
                  </Fragment>
                );
              })}
          </Fragment>
        </select>
        <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}/>
        <SearchBar/>
        <div>
          {currentPokemons &&
            currentPokemons.map((p) => {
              return (
                <div key={p.id}>
                  <Card name={p.name} image={p.image} types={p.types} id={p.id} />
                </div>
              );
            })}
        </div>
        <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}/>
      </div>
    </div>
  );
}
