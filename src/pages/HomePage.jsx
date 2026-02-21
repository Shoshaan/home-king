import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export function HomePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // جاهز نربطه بالـ backend لاحقًا
    alert("Message submitted successfully!");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      {/* Hero */}
      <section
        id="hero-section"
        className="hero-section d-flex align-items-center text-light"
      >
        <Container className="text-center">
          <h1 className="display-4 fw-bold mb-3">Welcome to KH Company</h1>
          <p className="lead mb-4">
            Premium industrial solutions built with precision and reliability.
          </p>
          <Button as={Link} to="/products" variant="danger" size="lg">
            Explore Products
          </Button>
        </Container>
      </section>

      {/* About */}
      <section
        id="about-section"
        className="about-section d-flex align-items-center"
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-3">About Us</h2>
              <p>
                KH Company delivers high-quality engineering and industrial
                products designed for performance and durability.
              </p>
            </Col>
            <Col md={6}>
              <div className="about-box shadow-sm p-4 bg-white rounded">
                <h5 className="fw-bold text-danger">Why Choose Us?</h5>
                <ul className="mt-3">
                  <li>High performance products</li>
                  <li>Industry-grade reliability</li>
                  <li>Professional support</li>
                  <li>Scalable solutions</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Us */}
      <section
        id="contact-section"
        className="contact-section d-flex align-items-center"
      >
        <Container>
          <h2 className="text-center fw-bold mb-4 text-light">Contact Us</h2>

          <Row className="justify-content-center w-100">
            <Col md={8}>
              <Form
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded shadow"
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="danger" className="w-100">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
