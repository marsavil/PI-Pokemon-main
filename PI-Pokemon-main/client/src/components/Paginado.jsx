import React from 'react';
import styles from '../styles/Paginado.module.css';

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1)
        
    }
    return (
        <nav className= {styles.nav}>
            <ul className={styles.paginado}>
                {pageNumbers && pageNumbers.map(number => (
                    <li className={styles.page} key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}