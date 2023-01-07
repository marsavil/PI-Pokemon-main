import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Card.module.css';


export default function Card({ name, image, types, id }) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="image not found" width="400px" height="400px" />
      <Link className={styles.name} to={`/home/${id}`}><h3 >{name}</h3></Link>
      <div className={styles.types}>
        {types &&
          types.map((t) => {
            return (
              <div key={t.id}>
                <li>{t.name}</li>
              </div>
            );
          })}
      </div>
    </div>
  );
}
