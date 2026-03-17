import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

import { clearCart } from "../redux/cartSlice";

export function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // optional: get order id from URL
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    // clear cart after success
    dispatch(clearCart());

    // scroll top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container className="text-center mt-5">
      {/* Icon */}
      <div style={{ fontSize: "60px" }}>✅</div>

      {/* Title */}
      <h2 className="mt-3">Payment Successful</h2>

      {/* Subtitle */}
      <p className="text-muted">
        Thank you! Your order has been placed successfully.
      </p>

      {/* Order ID (optional) */}
      {orderId && (
        <p>
          Order ID: <strong>{orderId}</strong>
        </p>
      )}

      {/* Buttons */}
      <div className="mt-4 d-flex justify-content-center gap-3">
        <Button variant="danger" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>

        <Button variant="outline-dark" onClick={() => navigate("/cart")}>
          View Cart
        </Button>
      </div>
    </Container>
  );
}
