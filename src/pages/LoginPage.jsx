import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ====================
  // Redirect if logged in
  // ====================
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // ====================
  // Handle change
  // ====================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ====================
  // Submit
  // ====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    // simulate delay (UX)
    setTimeout(() => {

      const success = login(form.email, form.password);

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);

    }, 700);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          background: "#fff"
        }}
      >

        <h3 className="mb-4 text-center">Admin Login</h3>

        {/* ERROR */}
        {error && (
          <div className="text-danger mb-3 text-center">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {/* BUTTON */}
          <Button
            type="submit"
            variant="danger"
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

        </Form>

      </div>

    </Container>
  );
}