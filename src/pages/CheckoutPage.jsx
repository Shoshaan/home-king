import { useSelector } from "react-redux";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: formData,
        items: cartItems,
      }),
    });

    const data = await response.json();

    // redirect to paymob
    window.location.href = data.paymentUrl;
  };

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Address"
            name="address"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="danger">
          Proceed to Payment
        </Button>
      </Form>
    </Container>
  );
}
