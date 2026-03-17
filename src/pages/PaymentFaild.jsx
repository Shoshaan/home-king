import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function PaymentFailed() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container className="text-center mt-5">
      <div style={{ fontSize: "60px" }}>❌</div>

      <h2 className="mt-3">Payment Failed</h2>

      <p className="text-muted">Something went wrong. Please try again.</p>

      <div className="mt-4 d-flex justify-content-center gap-3">
        <Button variant="danger" onClick={() => navigate("/checkout")}>
          Try Again
        </Button>

        <Button variant="outline-dark" onClick={() => navigate("/cart")}>
          Back to Cart
        </Button>
      </div>
    </Container>
  );
}
