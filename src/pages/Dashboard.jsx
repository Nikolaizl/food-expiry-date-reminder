import { useEffect, useState } from "react";
import FoodList from "./FoodList"; // Make sure the path is correct
import axios from "axios";

export default function Dashboard() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods");
      setFoods(res.data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    }
  };

  const handleUpdate = (food) => {
    console.log("Update:", food);
  };

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/${foodId}`);
      setFoods((prev) => prev.filter((f) => f.id !== foodId));
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Dashboard</h2>

      {foods.length > 0 ? (
        <FoodList
          foods={foods}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onPressFood={(food) => console.log("Pressed:", food)}
        />
      ) : (
        <p>No food items found.</p>
      )}
    </div>
  );
}
