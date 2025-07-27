import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner, Card, Button, ListGroup } from "react-bootstrap";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: { apiKey: "604e08a6a7414eb1ad73ee4d2bb664c9" },
          }
        );
        setRecipe(res.data);
      } catch (err) {
        console.error("Error loading recipe:", err);
      }
    }

    fetchRecipe();
  }, [id]);

  if (!recipe)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading recipe...</p>
      </Container>
    );

  return (
    <Container className="my-5">
      <Link to="/recipes" className="text-decoration-none">
        <Button variant="outline-success" className="mb-4">
          <i className="bi bi-arrow-left"></i> Back to Search
        </Button>
      </Link>

      <Card className="shadow-lg mx-auto" style={{ maxWidth: "700px" }}>
        <div style={{ height: "300px", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={recipe.image}
            alt={recipe.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <Card.Body>
          <h3 className="fw-bold text-success">{recipe.title}</h3>

          {/* Ingredients */}
          {recipe.extendedIngredients?.length > 0 && (
            <>
              <h5 className="mt-4">Ingredients</h5>
              <ListGroup variant="flush" className="mb-3">
                {recipe.extendedIngredients.map((ing) => (
                  <ListGroup.Item key={ing.id}>
                    <i className="bi bi-check-circle text-success me-2"></i>
                    {ing.original}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <>
              <h5 className="mt-4">Instructions</h5>
              <Card.Text
                className="lh-lg"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
