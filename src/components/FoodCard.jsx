import {
  format,
  differenceInCalendarDays,
  isBefore,
  startOfDay,
} from "date-fns";
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

  const today = startOfDay(new Date());
  const expiryDate = startOfDay(new Date(food.expiry_date));
  const daysLeft = differenceInCalendarDays(expiryDate, today);

  let status = (
    <span>
      <i class="bi bi-battery-full"></i> Fresh
    </span>
  );
  let badgeClass = "bg-primary";

  if (isBefore(expiryDate, today)) {
    status = (
      <span>
        <i class="bi bi-battery-low"></i> Expired
      </span>
    );
    badgeClass = "bg-danger";
  } else if (daysLeft <= 3) {
    status = (
      <span>
        <i class="bi bi-battery-half"></i> Expiring soon
      </span>
    );
    badgeClass = "bg-warning";
  }

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
            Expiry: {format(expiryDate, "dd/MM/yyyy")}
          </Card.Text>
          <Card.Text className="text-muted mb-2">
            Quantity: <strong>{food.quantity}</strong>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className={`badge ${badgeClass} fs-6`}>{status}</span>

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
                <i class="bi bi-pencil"></i> Update
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setOptionVisible(false);
                  onDelete(food.id);
                }}
              >
                <i class="bi bi-trash3"></i> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
}
