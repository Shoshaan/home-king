import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../productsSlice";

export function ProductModal() {
  const { selectedProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <Modal
      show={!!selectedProduct}
      onHide={() => dispatch(closeModal())}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedProduct?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{selectedProduct?.details}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
