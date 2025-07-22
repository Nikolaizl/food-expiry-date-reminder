import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createFood, updateFood } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { searchFoodByName } from "../api/openFoodFacts";

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
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [status, setStatus] = useState("Fresh");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (foodToEdit) {
      setName(foodToEdit.name);
      setExpiryDate(foodToEdit.expiry_date?.substring(0, 10) || "");
      setQuantity(foodToEdit.quantity);
      setStatus(foodToEdit.status);
      if (foodToEdit.image_url) {
        setPreviewUrl(foodToEdit.image_url);
        setImageUrl(foodToEdit.image_url);
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

  const { getIdToken } = useAuth();

  const handleClose = () => {
    setName("");
    setExpiryDate("");
    setQuantity(1);
    setSelectedImage(null);
    setPreviewUrl("");
    setStatus("Fresh");
    onClose();
    setLoadingSuggestions(false);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const freshToken = await getIdToken(true);
      if (!freshToken) {
        console.error("No token available");
        throw new Error("Not authenticated - no token available");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("expiry_date", expiryDate);
      formData.append("quantity", quantity);
      formData.append("status", status);
      if (selectedImage) {
        formData.append("image", selectedImage);
      } else if (imageUrl) {
        formData.append("image_url", imageUrl);
      } else if (foodToEdit?.image_url) {
        formData.append("image_url", foodToEdit.image_url);
      }

      console.log(
        "Submitting with fresh token:",
        freshToken.substring(0, 10) + "..."
      );

      if (foodToEdit) {
        await updateFood(foodToEdit.id, formData, freshToken);
      } else {
        await createFood(formData, freshToken);
      }
      onFoodAdded();
      handleClose();
    } catch (err) {
      console.error("Error creating food:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      }
    }
  };

  const handleAutoFill = async () => {
    if (!name) return;

    setLoadingSuggestions(true);
    setSuggestions([]);

    try {
      const results = await searchFoodByName(name);
      if (results.length === 0) {
        alert("No match found from Open Food Facts.");
      } else {
        setSuggestions(results);
      }
    } catch (err) {
      console.error("Auto-fill error:", err);
      alert("Failed to fetch suggestions.");
    }

    setLoadingSuggestions(false);
  };

  const handleSelectSuggestion = (item) => {
    setName(item.name);
    if (item.image_url) {
      setPreviewUrl(item.image_url);
      setImageUrl(item.image_url);
      setSelectedImage(null);
    }
    setSuggestions([]);
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
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={handleAutoFill}
            >
              Search
            </Button>
            {loadingSuggestions && (
              <div className="mt-2 text-muted">
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Loading suggestions...
              </div>
            )}
            {suggestions.length > 0 && (
              <div className="mt-2">
                <Form.Label>Select a suggestion:</Form.Label>
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="border p-2 mb-1 rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    <strong>{item.name}</strong>
                    {item.image_url && (
                      <div>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            marginTop: "5px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
