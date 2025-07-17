import { format } from "date-fns";
import { Card, Dropdown } from "react-bootstrap";
import { useState } from "react";
import noImage from "../assets/images/no_image.png";

export default function FoodCard({ food, onUpdate, onDelete, onPressFood }) {
  const [optionVisible, setOptionVisible] = useState(false);
  if (!food || !food.id) return null;

  const handleToggle = (isOpen) => {
    setOptionVisible(isOpen);
  };

  const handleCardClick = () => {
    if (!optionVisible) {
      onPressFood(food);
    }
  };

  return (
    <Card
      className="h-100 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <Card.Img
        variant="top"
        src={food.image_url || noImage}
        alt={food.name}
        style={{ height: "250px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{food.name}</Card.Title>
          <Card.Text className="text-muted mb-1">
            Expiry: {format(new Date(food.expiry_date), "dd/MM/yyyy")}
          </Card.Text>
          <Card.Text className="text-muted mb-2">
            Quantity: <strong>{food.quantity}</strong>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span
            className={`badge ${
              food.status === "Expired"
                ? "bg-danger"
                : food.status === "Expiring soon"
                ? "bg-warning text-dark"
                : "bg-primary"
            }`}
          >
            {food.status}
          </span>

          <Dropdown
            show={optionVisible}
            onToggle={handleToggle}
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown.Toggle
              variant="light"
              size="sm"
              id={`dropdown-${food.id}`}
            >
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setOptionVisible(false);
                  onUpdate(food);
                }}
              >
                Update
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setOptionVisible(false);
                  onDelete(food.id);
                }}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
}
