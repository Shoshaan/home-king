import { Container, Row, Col } from "react-bootstrap";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }) {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white vh-100 p-3">
          <Sidebar />
        </Col>

        {/* Content */}
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
