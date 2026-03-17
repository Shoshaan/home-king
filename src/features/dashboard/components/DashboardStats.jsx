import { Card, Row, Col } from "react-bootstrap";

export function DashboardStats() {
  const stats = [
    { title: "Products", value: 12 },
    { title: "Orders", value: 8 },
    { title: "Revenue", value: "$2,400" },
  ];

  return (
    <Row className="mb-4">
      {stats.map((stat, i) => (
        <Col md={4} key={i}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-muted">{stat.title}</h6>
              <h3>{stat.value}</h3>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
