import { Card, Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { setSelectedProduct } from "../productsSlice";
import { addToCart } from "../../cart/cartSlice";

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Col md={4} className="mb-4">
      <Card className="shadow-sm h-100 product-card">
        {/* Product Image */}
        <Card.Img
          variant="top"
          src={product.image}
          style={{
            height: "220px",
            objectFit: "contain",
            background: "#f8f9fa",
            padding: "10px",
          }}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.name}</Card.Title>

          <Card.Text className="flex-grow-1">{product.description}</Card.Text>
          <h5 className="product-price">${product.price}</h5>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <Button
              variant="danger"
              onClick={() => dispatch(setSelectedProduct(product))}
            >
              Learn More
            </Button>

            <Button
              variant="outline-dark"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
