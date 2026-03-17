import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";

export function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  // ====================
  // Handle Input Change
  // ====================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // remove error on typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // ====================
  // Validation
  // ====================
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Enter a valid email";

    if (!formData.phone || formData.phone.length < 10)
      newErrors.phone = "Enter a valid phone number";

    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ====================
  // Submit
  // ====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          items: cartItems,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      // redirect to payment
      window.location.href = data.paymentUrl;
    } catch {
      setError("Something went wrong. Please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* ================= FORM ================= */}
        <Col md={7}>
          <h3 className="mb-4">Billing Details</h3>

          {error && <div className="text-danger mb-3">{error}</div>}

          <Form onSubmit={handleSubmit}>
            {/* First Name */}
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Last Name */}
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Phone *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Address */}
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Address *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Submit */}
            <Button
              type="submit"
              variant="danger"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </Form>
        </Col>

        {/* ================= SUMMARY ================= */}
        <Col md={5}>
          <Card>
            <Card.Body>
              <h4>Order Summary</h4>

              <hr />

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>

                  <span>${item.price * item.quantity}</span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>${total}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
