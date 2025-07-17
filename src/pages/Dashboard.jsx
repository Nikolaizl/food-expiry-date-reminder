import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FoodCard from "../components/FoodCard";
import { getFoods, deleteFood } from "../api";
import AddFoodModal from "../components/AddFoodModal";

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setIsLoading(true);
    try {
      const data = await getFoods();
      setFoods(data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (food) => {
    setFoodToEdit(food);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFoodToEdit(null);
  };

  const handleDelete = async (foodId) => {
    try {
      await deleteFood(foodId);
      setFoods((prev) => prev.filter((f) => f.id !== foodId));
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Dashboard</h2>
      <Button onClick={() => setShowModal(true)}>+ Add Food</Button>

      <div className="row mt-4 g-4">
        {isLoading ? (
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : foods.length > 0 ? (
          foods.map((food) => (
            <div key={food.id} className="col-12 col-md-6 col-lg-4">
              <FoodCard
                food={food}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onPressFood={(food) => console.log("Pressed:", food)}
              />
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>

      <AddFoodModal
        show={showModal}
        onClose={handleCloseModal}
        onFoodAdded={fetchFoods}
        foodToEdit={foodToEdit}
      />
    </div>
  );
}
