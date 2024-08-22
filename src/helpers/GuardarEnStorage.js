export const GuardarEnStorage = (clave, element ) => {
  //Conseguir los elementos del localStorage
  let elements = JSON.parse(localStorage.getItem(clave));

  //Comprobar si es un array
  if (Array.isArray(elements)) {
    //añadir dentro del array
    elements.push(element);
  }else{
    //Crear un array con la nueva info
    elements=[element]
  }

  //Guardar en el localStorage
  localStorage.setItem(clave, JSON.stringify(elements) )

  //Devolver objeto guardado
  return element
};