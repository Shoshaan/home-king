import { Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="footer-section text-light py-4">
      <Container className="text-center">
        <p className="mb-1 fw-bold">HK Company</p>
        <small>
          © {new Date().getFullYear()} HK Company. All rights reserved.
        </small>
      </Container>
    </footer>
  );
};
