import React from "react";
import styles from "../styles/Paginado.module.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <div className={styles.nav}>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div className={styles.page} key={number}>
            <p onClick={() => paginado(number)}>{number}</p>
          </div>
        ))}
    </div>
  );
}
