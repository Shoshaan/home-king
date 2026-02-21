import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../features/products/components/Logo";
import { useEffect, useState } from "react";

export const CustomNavbar = () => {
  const [activeSection, setActiveSection] = useState("hero-section");
  const location = useLocation();
  const navigate = useNavigate();

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
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <Logo size={48} />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => scrollToSection("hero-section")}
              className={activeSection === "hero-section" ? "active" : ""}
            >
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection("about-section")}
              className={activeSection === "about-section" ? "active" : ""}
            >
              About Us
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection("contact-section")}
              className={activeSection === "contact-section" ? "active" : ""}
            >
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
