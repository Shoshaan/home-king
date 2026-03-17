import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // 🔥 حماية الصفحة
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, []);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";

    if (!formData.email.includes("@")) newErrors.email = "Invalid email";

    if (formData.phone.length < 10) newErrors.phone = "Invalid phone";

    if (!formData.address) newErrors.address = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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

      window.location.href = data.paymentUrl;
    } catch {
      setError("Network error, please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* FORM */}
        <Col md={7}>
          <h3 className="mb-4">Billing Details</h3>

          {error && (
            <div className="text-danger mb-3 d-flex justify-content-between align-items-center">
              <span>{error}</span>
              <Button size="sm" onClick={() => setError("")}>
                Retry
              </Button>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="mb-3"
              placeholder="First Name *"
              name="firstName"
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>

            <Form.Control
              className="mb-3"
              placeholder="Last Name *"
              name="lastName"
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>

            <Form.Control
              className="mb-3"
              placeholder="Email *"
              name="email"
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>

            <Form.Control
              className="mb-3"
              placeholder="Phone *"
              name="phone"
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>

            <Form.Control
              className="mb-3"
              placeholder="Address *"
              name="address"
              onChange={handleChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>

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

        {/* SUMMARY */}
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
