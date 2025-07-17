import { format } from "date-fns";
import { Card, Dropdown } from "react-bootstrap";
import { useState } from "react";

export default function FoodCard({ food, onUpdate, onDelete }) {
  const [menuVisible, setMenuVisible] = useState(false);
  if (!food || !food.id) return null;

  const handleToggle = (isOpen) => {
    setMenuVisible(isOpen);
  };

  return (
    <Card className="h-100 shadow-sm" style={{ cursor: "pointer" }}>
      {food.image_url && (
        <Card.Img
          variant="top"
          src={food.image_url}
          alt={food.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}

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
            show={menuVisible}
            onToggle={handleToggle}
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown.Toggle
              variant="light"
              size="sm"
              id={`dropdown-${food.id}`}
            >
              ⋮
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setMenuVisible(false);
                  onUpdate(food);
                }}
              >
                Update
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setMenuVisible(false);
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
