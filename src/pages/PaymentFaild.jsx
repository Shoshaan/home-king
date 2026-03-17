import { Container } from "react-bootstrap";

export function PaymentFailed() {
  return (
    <Container className="text-center mt-5">
      <h2>❌ Payment Failed</h2>
      <p>Please try again.</p>
    </Container>
  );
}
