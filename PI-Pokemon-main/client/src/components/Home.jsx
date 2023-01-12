import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterPokemonsByOrigin,
  orderByName,
  sortByType,
  orderByAttack,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "../styles/Home.module.css";
import tittle from "../images/tittle.gif";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.filteredPokemons);
  const allTypes = useSelector((state) => state.types);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pagenNumber) => {
    setCurrentPage(pagenNumber);
  };

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

  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterPokemonsByOrigin(e.target.value));
  }
  function handleOrderByName(e) {
    if (e.target.value === "noSort") {
      dispatch(getPokemons());
    }
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered from ${e.target.value}`);
  }
  function handleOrderByAttack(e) {
    if (e.target.value === "noSort") {
      dispatch(getPokemons());
    }
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered from ${e.target.value}`);
  }
  function handleType(e) {
    e.preventDefault();
    dispatch(sortByType(e.target.value));
    setCurrentPage(1);
    setOrder(`Sorted by type ${e.target.value}`);
  }

  return (
    <div className={styles.home}>
      <div className={styles.head}>
        <div className={styles.tittle}>
          <img className={styles.tittleImg} src={tittle} alt="" width={'350px'} />
          <Link to="/pokemon">
            <button className={styles.btn2}>Create Pokemon</button>{" "}
          </Link>
        </div>
        <div className={styles.sort}>
          <div className={styles.sortLabel}>
            <h3>by Name</h3>
          </div>
          <div className={styles.sortSelect}>
            <select
              className={styles.option}
              onChange={(e) => handleOrderByName(e)}
            >
              <option className={styles.option} value="noSort">
                Initial State
              </option>
              <option value="A-to-Z">A-Z</option>
              <option value="Z-to-A">Z-A</option>
            </select>
          </div>
          <div className={styles.sortLabel}>
            <h3>by Attack</h3>
          </div>
          <div className={styles.sortSelect}>
            <select
              className={styles.option}
              onChange={(e) => handleOrderByAttack(e)}
            >
              <option value="noSort">Initial State</option>
              <option value="asc">Min_Attack</option>
              <option value="desc">Max_Attack</option>
            </select>
          </div>
          <div className={styles.sortReset}>
            <button
              className={styles.btn}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Restore
            </button>
          </div>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterLabel}>
            <h3>FILTER</h3>
          </div>
          <div className={styles.filterSelect}>
            <select
              className={styles.option}
              onChange={(e) => handleFilterOrigin(e)}
            >
              <option value="all">All</option>
              <option value="api">Our Pokemons</option>
              <option value="db">Created Pokemons</option>
            </select>
            <select className={styles.option} onChange={(e) => handleType(e)}>
              <option value="allTypes">All Types</option>

              <Fragment>
                {allTypes &&
                  allTypes.map((t) => {
                    return (
                      <Fragment key={t.id}>
                        <option value={t.name}>{t.name}</option>
                      </Fragment>
                    );
                  })}
              </Fragment>
            </select>
          </div>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar />
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
        </div>
        <div className={styles.buttons}>
          
        </div>
      </div>
      <div className={styles.Card_container}>
        {currentPokemons &&
          currentPokemons.map((p) => {
            //console.log(currentPokemons)
            console.log(p);
            return (
              <div className={styles.card} key={p.id}>
                <Card name={p.name} image={p.image} types={p.types} id={p.id} />
              </div>
            );
          })}
      </div>
      <div>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
      </div>
      <div></div>
    </div>
  );
}
