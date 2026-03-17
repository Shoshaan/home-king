import { useState } from "react";
import { Table, Button, Form, Row, Col, Pagination } from "react-bootstrap";
import { ProductFormModal } from "./ProductFormModal";
import { mockProducts } from "../../../data/mockProducts";

export function ProductsTable() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ====================
  // Filter
  // ====================
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  // ====================
  // Pagination
  // ====================
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // ====================
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ====================
  const handleAdd = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = (product) => {
    if (product.id) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      product.id = Date.now();
      setProducts([...products, product]);
    }

    setShowModal(false);
  };

  return (
    <>
      {/* HEADER */}
      <Row className="mb-3">
        <Col md={6}>
          <h4>Products</h4>
        </Col>

        <Col md={6} className="text-md-end">
          <Button variant="danger" onClick={handleAdd}>
            + Add Product
          </Button>
        </Col>
      </Row>

      {/* SEARCH */}
      <Form.Control
        className="mb-3"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>

              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* PAGINATION */}
      <Pagination>
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* MODAL */}
      <ProductFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        product={selectedProduct}
      />
    </>
  );
}
