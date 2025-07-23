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
      <Link to="/recipes">
        <Button variant="outline-secondary" className="mb-4">
          ← Back to Search
        </Button>
      </Link>

      <Card className="mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Img variant="top" className="img-fluid" src={recipe.image} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>

          {recipe.extendedIngredients?.length > 0 && (
            <>
              <h5 className="mt-4">Ingredients</h5>
              <ListGroup variant="flush" className="mb-3">
                {recipe.extendedIngredients.map((ing) => (
                  <ListGroup.Item key={ing.id}>{ing.original}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}

          {recipe.instructions && (
            <>
              <h5 className="mt-4">Instructions</h5>
              <Card.Text
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
