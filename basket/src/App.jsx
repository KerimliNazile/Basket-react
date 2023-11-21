import { useEffect, useState } from 'react';
import './App.css';

import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [basket, setBasket] = useLocalStorage("basket");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const data = await fetch("https://northwind.vercel.app/api/products");
    const res = await data.json();
    setProducts(res);
    setIsLoading(false);
  }

  function handleAddBasket(item) {
    const elementIndex = basket.findIndex((x) => x.id === item.id);
    console.log(elementIndex);
    if (elementIndex !== -1) {
      const newBasket = [...basket];
      newBasket[elementIndex].count++;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  }
  function handleRemove(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }
  function handleCountVal(isAdd, item) {
    const elementIndex = basket.findIndex((x) => x.id === item.id);
    const newBasket = [...basket];
    if (isAdd) {
      newBasket[elementIndex].count++;
      setBasket(newBasket);
    } else {
      if (newBasket[elementIndex].count === 1) {
        return;
      }
      newBasket[elementIndex].count--;
      setBasket(newBasket);
    }
  }
  return (
    <div>
      <h3>Umumi hissse</h3>
      <button>Basket popupunu ac</button>

      <div style={{ border: "1px solid black" }}>
        <h3>basketim</h3>
        {basket.map((x) => (
          <>



            <ul>
              <li>{x.id}</li>
              <li>{x.name}</li>
              <li>sayi :{x.count}</li>
              <button onClick={() => handleRemove(x.id)}>Remove</button>
              <button onClick={() => handleCountVal(true, x)}>+</button>
              <button onClick={() => handleCountVal(false, x)}>-</button>
            </ul>
          </>
        ))}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {products.map((x) => (
            <ul>
              <li>{x.id}</li>
              <li>{x.name}</li>
              <button onClick={() => handleAddBasket(x)}>Add Basket</button>
            </ul>
          ))}
        </>
      )}
    </div>
  );
}


export default App;
