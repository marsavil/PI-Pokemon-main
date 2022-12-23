import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, image, types, id }) {
  return (
    <div>
      <img src={image} alt="image not found" width="200px" height="200px" />
      <Link to={`/home/${id}`}><h3>{name}</h3></Link>
      <div>
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
