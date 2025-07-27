import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";

export default function RecipeSearch() {
  const [ingredients, setIngredients] = useState(
    () => sessionStorage.getItem("ingredients") || ""
  );
  const [recipes, setRecipes] = useState(() => {
    const saved = sessionStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(
    () => !!sessionStorage.getItem("ingredients")
  );

  const handleSearch = async () => {
    if (!ingredients.trim()) return;

    setIsLoading(true);

    try {
      const res = await axios.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        {
          params: {
            ingredients,
            number: 32,
            apiKey: "604e08a6a7414eb1ad73ee4d2bb664c9",
          },
        }
      );
      setRecipes(res.data);
      sessionStorage.setItem("recipes", JSON.stringify(res.data));
      sessionStorage.setItem("ingredients", ingredients);
      setHasSearched(true);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm mb-4 p-4 border-0 bg-light">
        <div className="d-flex align-items-center justify-content-center mb-3 text-success fw-bold">
          <i className="bi bi-fork-knife me-2 fs-3"></i>
          <h2 className="mb-0">Find Recipes by Ingredients</h2>
        </div>
        <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
          <Row className="g-2 justify-content-center">
            <Col xs={12} md={8}>
              <Form.Control
                type="text"
                placeholder="e.g. egg, tomato, cheese"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="shadow-sm"
              />
            </Col>
            <Col xs={12} md={2}>
              <Button
                variant="success"
                onClick={handleSearch}
                className="w-100 fw-bold"
              >
                <i className="bi bi-search"></i> Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : recipes.length > 0 ? (
        <Row className="g-4">
          {recipes.map((recipe) => (
            <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <Card
                as={Link}
                to={`/recipes/${recipe.id}`}
                className="text-decoration-none text-dark h-100 shadow-sm hover-shadow"
              >
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  alt={recipe.title}
                  className="rounded-top"
                />
                <Card.Body>
                  <Card.Title className="fs-6">{recipe.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : hasSearched ? (
        <p className="text-center py-5 text-muted fs-5">
          No recipes found. Try different ingredients.
        </p>
      ) : (
        <p className="text-center text-muted mt-5">
          Enter ingredients to find delicious recipes!
        </p>
      )}
    </Container>
  );
}
