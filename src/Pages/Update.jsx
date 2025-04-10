import React from "react";
import Cart from "./Cart";


const App = () => {
  const userId = localStorage.getItem("userId"); 

  if (!userId) return <p>Please log in</p>;

  return (
    <div>
      <Cart userId={userId} />
    </div>
  );
};

export default App;

