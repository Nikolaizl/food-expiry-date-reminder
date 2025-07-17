import { useState } from "react";
import { format } from "date-fns";
import { Card, Dropdown } from "react-bootstrap";

export default function FoodList({ foods, onUpdate, onDelete, onPressFood }) {
  const [menuVisibleId, setMenuVisibleId] = useState(null);

  return (
    <div className="row mt-3">
      {foods.map((food) => (
        <div key={food.id} className="col-md-6 col-lg-4 mb-4">
          <Card
            className="h-100 shadow-sm"
            onClick={() => onPressFood(food)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title>{food.name}</Card.Title>
                <Card.Text className="text-muted">
                  Expiry: {format(new Date(food.expiry_date), "dd/MM/yyyy")}
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
                  show={menuVisibleId === food.id}
                  onToggle={() =>
                    setMenuVisibleId(menuVisibleId === food.id ? null : food.id)
                  }
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
                        setMenuVisibleId(null);
                        onUpdate(food);
                      }}
                    >
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setMenuVisibleId(null);
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
        </div>
      ))}
    </div>
  );
}
