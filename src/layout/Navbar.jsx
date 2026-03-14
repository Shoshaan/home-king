import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { Logo } from "../features/products/components/Logo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

export const CustomNavbar = () => {
  const [activeSection, setActiveSection] = useState("hero-section");
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["hero-section", "about-section", "contact-section"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      fixed="top"
      expanded={expanded}
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <Logo size={48} />
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => {
                setExpanded(false);
                if (window.location.pathname !== "/") {
                  navigate("/");
                } else {
                  scrollToSection("hero-section");
                }
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/products"
              onClick={() => setExpanded(false)}
            >
              Products
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                setExpanded(false);
                scrollToSection("about-section");
              }}
              className={activeSection === "about-section" ? "active" : ""}
            >
              About Us
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                setExpanded(false);
                scrollToSection("contact-section");
              }}
              className={activeSection === "contact-section" ? "active" : ""}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="cart-link">
              {" "}
              onClick={() => setExpanded(false)}
              <span className="cart-icon-wrapper">
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      fontSize: "10px",
                    }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
