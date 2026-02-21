import { Card, Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../productsSlice";

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Col md={4} className="mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button
            variant="danger"
            onClick={() => dispatch(setSelectedProduct(product))}
          >
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
