import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FoodCard from "../components/FoodCard";
import { getFoods, deleteFood } from "../api";
import AddFoodModal from "../components/AddFoodModal";
import FoodDetailModal from "../components/FoodDetailModal";

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
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

  const handleShowDetails = (food) => {
    setSelectedFood(food);
    setShowDetailModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailModal(false);
    setSelectedFood(null);
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
            <div key={food.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <FoodCard
                food={food}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onPressFood={handleShowDetails}
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

      <FoodDetailModal
        show={showDetailModal}
        onClose={handleCloseDetails}
        food={selectedFood}
      />
    </div>
  );
}
