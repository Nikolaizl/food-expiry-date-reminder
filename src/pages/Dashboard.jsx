import { useEffect, useState, useCallback } from "react";
import { Button, Card } from "react-bootstrap";
import FoodCard from "../components/FoodCard";
import { getFoods, deleteFood } from "../api/api";
import AddFoodModal from "../components/AddFoodModal";
import { useAuth } from "../context/AuthContext";
import FoodDetailModal from "../components/FoodDetailModal";
import "./Dashboard.css";

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  const { getIdToken } = useAuth();

  const fetchFoods = useCallback(async () => {
    setIsLoading(true);
    try {
      const freshToken = await getIdToken(true);
      if (!freshToken) throw new Error("Not authenticated");
      const data = await getFoods(freshToken);
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
      if (!freshToken) throw new Error("Not authenticated");
      await deleteFood(foodId, freshToken);
      setFoods((prev) => prev.filter((f) => f.id !== foodId));
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  const getSortedFoods = () => {
    const sorted = [...foods];
    if (sortBy === "expiry") {
      sorted.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  };

  return (
    <div className="dashboard-bg py-4">
      <div className="container bg-white rounded shadow p-4">
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3 mx-auto"
          style={{ maxWidth: "900px" }}
        >
          <div className="d-flex align-items-center text-success">
            <i className="bi bi-cart4 fs-2 me-2"></i>
            <h2 className="fw-bold mb-0 text-center text-md-start">
              Your Dashboard
            </h2>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2">
            <Button
              variant="success"
              className="w-100 w-sm-auto"
              onClick={() => setShowModal(true)}
            >
              + Add Food
            </Button>
            <select
              className="form-select w-100 w-sm-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="expiry">Sort: Expiry Date</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex flex-column align-items-center py-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-3 text-muted">Fetching your foods...</p>
          </div>
        ) : foods.length > 0 ? (
          <div className="row g-4">
            {getSortedFoods().map((food) => (
              <div key={food.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <FoodCard
                  food={food}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onPressFood={handleShowDetails}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">
              No food items found. Add your first one!
            </p>
          </div>
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
