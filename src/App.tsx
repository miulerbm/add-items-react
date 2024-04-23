import React, { useState } from "react";
import "./App.css";

interface Item {
  id: string;
  timestamp: number;
  text: string;
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Videojuegos",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Libros",
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Por qué no el e.target.value? -> Para escuchar el onChange de un INPUT,
    // lo que estamos haciendo es escuchar el evento onSubmit

    // Recuperando los datos de un formulario:
    // Recuperamos el elemento que ha iniciado el evento (en este caso, el formulario):
    // Recuperamos los elementos, la colección de los controles dentro del formulario
    const { elements } = event.currentTarget;
    // Con esto podemos hacer 2 cosas: recuperar el valor y sobreescribirlo (para resetearlo después)

    // estrategia 1, trampa de TypeScript:
    // const input = elements.namedItem("item") as HTMLInputElement;

    // estrategia 2, lo correcto, asegurarse que realmente es lo que es:
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement; // JS puro
    if (!isInput || input == null) return;
    // si el input es vacío o no es un input, no se devuelve nada

    // Ahora que se ha validado el input como elemento HTMLInputElement, creamos un item:
    // Esto se llama type narrowing (ir descartando otros posibles tipos hasta quedarse con el correcto)
    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    // Mediante un callback, tenemos los elementos previos y devolvemos lo nuevo con lo que se actualizará el estado.
    setItems((prevItems) => {
      return [...prevItems, newItem];
    });

    // Se resetea el input value:
    input.value = "";
  };
  return (
    <main>
      <aside>
        <h1>Prueba técnica de React</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Elemento a introducir:
            <input name="item" required type="text" placeholder="Elemento" />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {items.map((item) => {
            return <li key={item.id}>{item.text}</li>;
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
