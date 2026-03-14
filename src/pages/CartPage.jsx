import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../features/cart/cartSlice";

export function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h3>Your cart is empty</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Products */}
        <Col lg={8} md={12}>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  {/* Image */}
                  <Col xs={4} md={3}>
                    <img
                      src={item.images[0]}
                      className="img-fluid"
                      alt={item.name}
                    />
                  </Col>

                  {/* Name */}
                  <Col xs={8} md={3}>
                    <h5>{item.name}</h5>
                  </Col>

                  {/* Price */}
                  <Col xs={6} md={2}>
                    ${item.price}
                  </Col>

                  {/* Quantity */}
                  <Col xs={6} md={2}>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => dispatch(decreaseQty(item.id))}
                      >
                        -
                      </Button>

                      {item.quantity}

                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => dispatch(increaseQty(item.id))}
                      >
                        +
                      </Button>
                    </div>
                  </Col>

                  {/* Subtotal */}
                  <Col xs={12} md={2} className="text-md-end mt-2 mt-md-0">
                    <div className="cart-total-label">Total</div>

                    <div className="cart-total-price">
                      ${item.price * item.quantity}
                    </div>
                  </Col>

                  {/* Remove */}
                  <Col xs={6} md={1}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      ✕
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Order Summary */}
        <Col lg={4} md={12}>
          <Card>
            <Card.Body>
              <h4>Order Summary</h4>

              <hr />

              <div className="d-flex justify-content-between">
                <span>Total</span>

                <strong>${total}</strong>
              </div>

              <Button variant="danger" className="w-100 mt-3">
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
