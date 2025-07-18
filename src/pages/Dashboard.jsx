import { useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import FoodCard from "../components/FoodCard";
import { getFoods, deleteFood } from "../api";
import AddFoodModal from "../components/AddFoodModal";
import { useAuth } from "../context/AuthContext";
import FoodDetailModal from "../components/FoodDetailModal";

export default function Dashboard() {
  console.log("Dashboard component mounting");
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getIdToken, currentUser } = useAuth();

  console.log("Auth state:", { isAuthenticated: !!currentUser });

  const fetchFoods = useCallback(async () => {
    console.log("Fetching foods...");
    setIsLoading(true);
    try {
      const freshToken = await getIdToken(true);
      console.log("Token obtained:", !!freshToken);
      if (!freshToken) {
        throw new Error("Not authenticated");
      }
      const data = await getFoods(freshToken);
      console.log("Foods fetched:", data);
      setFoods(data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setIsLoading(false);
    }
  }, [getIdToken]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

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
      const freshToken = await getIdToken(true);
      if (!freshToken) {
        throw new Error("Not authenticated");
      }
      await deleteFood(foodId, freshToken);
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
