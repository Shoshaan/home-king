import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { increaseQty, decreaseQty, removeFromCart } from "../features/cart/cartSlice";

export function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate("/checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="mt-4">
      {/* EMPTY STATE */}
      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h3>Your cart is empty</h3>

          <Button
            variant="danger"
            className="mt-3"
            onClick={() => navigate("/")}
          >
            Go Shopping
          </Button>
        </div>
      ) : (
        <Row>
          {/* PRODUCTS */}
          <Col lg={8} md={12}>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <Row className="align-items-center">
                    {/* IMAGE */}
                    <Col xs={4} md={3}>
                      <img
                        src={item.images[0]}
                        className="img-fluid"
                        alt={item.name}
                      />
                    </Col>

                    {/* NAME */}
                    <Col xs={8} md={3}>
                      <h5>{item.name}</h5>
                    </Col>

                    {/* PRICE */}
                    <Col xs={6} md={2}>
                      ${item.price}
                    </Col>

                    {/* QUANTITY */}
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

                    {/* TOTAL */}
                    <Col xs={12} md={2} className="text-md-end mt-2 mt-md-0">
                      <div className="cart-total-label">Total</div>

                      <div className="cart-total-price">
                        ${item.price * item.quantity}
                      </div>
                    </Col>

                    {/* REMOVE */}
                    <Col xs={12} className="mt-2 text-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>

          {/* SUMMARY */}
          <Col lg={4} md={12}>
            <Card>
              <Card.Body>
                <h4>Order Summary</h4>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <strong>${total}</strong>
                </div>

                <Button
                  variant="danger"
                  className="w-100 mt-3"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
