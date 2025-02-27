import { useParams } from "react-router-dom";
import Cart from "./Cart";

const Buy = () => {
  const { userId } = useParams(); // Get userId from URL

  return (
    <div>
      <h1>Buy Page</h1>
      <Cart userId={userId} />
    </div>
  );
};

export default Buy;
