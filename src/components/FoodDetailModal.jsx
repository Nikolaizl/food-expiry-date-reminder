import { Modal, Button, Image } from "react-bootstrap";
import { format } from "date-fns";
import noImage from "../assets/images/no_image.png";

export default function FoodDetailModal({ show, onClose, food }) {
  if (!food) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{food.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="text-center mb-4">
          <Image
            src={food.image_url || noImage}
            alt={food.name}
            fluid
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="food-details">
          <h5 className="mb-3">Food Details</h5>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Expiry Date:</strong>{" "}
                {format(new Date(food.expiry_date), "dd MMMM yyyy")}
              </p>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    food.status === "Expired"
                      ? "bg-danger"
                      : food.status === "Expiring soon"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  {food.status}
                </span>
              </p>
              <p>
                <strong>Added on:</strong>{" "}
                {food.created_at
                  ? format(new Date(food.created_at), "dd MMMM yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
