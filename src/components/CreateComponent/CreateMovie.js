import React, { useState } from 'react';

import { GuardarEnStorage } from '../../helpers/GuardarEnStorage';

export const CreateMovie = () => {
  const titulo = 'Añadir pelicula';
  const [peliState, setPelistate] = useState({
    titulo: '',
    description: '',
  });

  const getDataForm = (e) => {
    e.preventDefault();
    let target = e.target;
    let titulo = target.titulo.value;
    let description = target.description.value;

    let movie = {
      id: new Date().getTime(),
      titulo,
      description,
    };
    setPelistate(movie);

    //guardar en almacenamiento local
    GuardarEnStorage('pelis', movie);
   
  };

 

  return (
    <>
      <div className="add">
        <h3 className="title">{titulo}</h3>
        <strong>
          {peliState.titulo &&
            peliState.description &&
            'has creado la pelicula: ' + peliState.titulo}
        </strong>

        <form onSubmit={getDataForm}>
          <input type="text" name="titulo" id="title" placeholder="Titulo" />
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
          ></textarea>
          <input type="submit" id="save" value="Guardar" />
        </form>
      </div>
    </>
  );
};
