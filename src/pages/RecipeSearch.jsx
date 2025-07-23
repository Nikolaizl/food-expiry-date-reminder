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
            number: 30,
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
    <Container className="my-4">
      <h2 className="mb-4">Find Recipes by Ingredients</h2>
      <Form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="e.g. egg, tomato, cheese"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Col>
          <Col sm={2}>
            <Button variant="success" onClick={handleSearch} className="w-100">
              <span>
                <i class="bi bi-search"></i> Search
              </span>
            </Button>
          </Col>
        </Row>
      </Form>
      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : recipes.length > 0 ? (
        <Row className="g-4">
          {recipes.map((recipe) => (
            <Col xs={12} sm={6} md={4} lg={2} key={recipe.id}>
              <Card
                as={Link}
                to={`/recipes/${recipe.id}`}
                className="text-decoration-none text-dark h-100"
              >
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : hasSearched ? (
        <p className="text-center py-5 text-muted">No recipes found.</p>
      ) : null}
    </Container>
  );
}
