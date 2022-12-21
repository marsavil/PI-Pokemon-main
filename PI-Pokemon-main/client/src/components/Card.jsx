import React from "react";

export default function Card({ name, image, types }) {
  return (
    <div>
      <img src={image} alt="image not found" width="200px" height="200px" />
      <h3>{name}</h3>
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
