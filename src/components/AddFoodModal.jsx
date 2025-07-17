import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createFood, updateFood } from "../api";

export default function AddFoodModal({
  show,
  onClose,
  onFoodAdded,
  foodToEdit,
}) {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [status, setStatus] = useState("Fresh");

  // Initialize form when foodToEdit changes
  useEffect(() => {
    if (foodToEdit) {
      setName(foodToEdit.name);
      setExpiryDate(foodToEdit.expiry_date);
      setQuantity(foodToEdit.quantity);
      setStatus(foodToEdit.status);
      if (foodToEdit.image_url) {
        setPreviewUrl(foodToEdit.image_url);
      }
    }
  }, [foodToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("expiry_date", expiryDate);
      formData.append("quantity", quantity);
      formData.append("status", status);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      if (foodToEdit) {
        await updateFood(foodToEdit.id, formData);
      } else {
        await createFood(formData);
      }
      onFoodAdded();
      handleClose();
    } catch (err) {
      console.error("Error creating food:", err);
    }
  };

  const handleClose = () => {
    setName("");
    setExpiryDate("");
    setQuantity(1);
    setSelectedImage(null);
    setPreviewUrl("");
    setStatus("Fresh");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{foodToEdit ? "Edit Food" : "Add Food"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="foodName">
            <Form.Label>Food Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter food name"
            />
          </Form.Group>

          <Form.Group controlId="expiryDate" className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={expiryDate}
              required
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="quantity" className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              required
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Food Image (optional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {foodToEdit ? "Save Changes" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
