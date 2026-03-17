import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export function ProductFormModal({ show, handleClose, handleSave, product }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
    preview: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        preview: product.image || "",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        image: null,
        preview: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ====================
  // Image Upload
  // ====================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFormData({
      ...formData,
      image: file,
      preview: previewUrl,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) return;

    handleSave({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-3"
            placeholder="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-3"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          {/* IMAGE UPLOAD */}
          <Form.Control
            type="file"
            className="mb-3"
            onChange={handleImageChange}
          />

          {/* PREVIEW */}
          {formData.preview && (
            <img
              src={formData.preview}
              alt="preview"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
