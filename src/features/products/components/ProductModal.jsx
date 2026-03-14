import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../productsSlice";
import { useRef, useState } from "react";

export function ProductModal() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);

  const [activeImage, setActiveImage] = useState(0);

  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const resultRef = useRef(null);

  const lensSize = 120;
  const zoomLevel = 1.4;

  if (!product) return null;

  function nextImage() {
    setActiveImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  }

  function prevImage() {
    setActiveImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  }

  function handleMouseMove(e) {
    const img = imgRef.current;
    const lens = lensRef.current;
    const result = resultRef.current;

    const rect = img.getBoundingClientRect();

    const naturalRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = rect.width / rect.height;

    let displayedWidth = rect.width;
    let displayedHeight = rect.height;

    if (naturalRatio > containerRatio) {
      displayedHeight = rect.width / naturalRatio;
    } else {
      displayedWidth = rect.height * naturalRatio;
    }

    const offsetX = (rect.width - displayedWidth) / 2;
    const offsetY = (rect.height - displayedHeight) / 2;

    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

    if (x < 0 || y < 0 || x > displayedWidth || y > displayedHeight) {
      lens.style.display = "none";
      result.style.display = "none";
      return;
    }

    lens.style.display = "block";
    result.style.display = "block";

    let left = x - lensSize / 2 + offsetX;
    let top = y - lensSize / 2 + offsetY;

    const minLeft = offsetX;
    const minTop = offsetY;
    const maxLeft = offsetX + displayedWidth - lensSize;
    const maxTop = offsetY + displayedHeight - lensSize;

    if (left < minLeft) left = minLeft;
    if (top < minTop) top = minTop;
    if (left > maxLeft) left = maxLeft;
    if (top > maxTop) top = maxTop;

    lens.style.left = left + "px";
    lens.style.top = top + "px";

    const cx = img.naturalWidth / displayedWidth;
    const cy = img.naturalHeight / displayedHeight;

    result.style.backgroundImage = `url(${product.images[activeImage]})`;

    result.style.backgroundSize = `${img.naturalWidth * zoomLevel}px ${img.naturalHeight * zoomLevel}px`;

    const centerX = x * cx * zoomLevel;
    const centerY = y * cy * zoomLevel;

    result.style.backgroundPosition = `-${centerX - result.offsetWidth / 2}px -${centerY - result.offsetHeight / 2}px`;

    const lensRect = lens.getBoundingClientRect();
    const zoomWidth = result.offsetWidth;
    const screenWidth = window.innerWidth;

    if (lensRect.right + zoomWidth + 20 > screenWidth) {
      result.style.left = lensRect.left - zoomWidth - 10 + "px";
    } else {
      result.style.left = lensRect.right + 10 + "px";
    }

    result.style.top = lensRect.top + "px";
  }

  function hideZoom() {
    lensRef.current.style.display = "none";
    resultRef.current.style.display = "none";
  }

  return (
    <>
      <Modal
        show={true}
        onHide={() => dispatch(closeModal())}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div
            className="zoom-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={hideZoom}
          >
            {/* الأسهم */}
            <button className="arrow left" onClick={prevImage}>
              <svg width="20" height="20" viewBox="0 0 16 16">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className="arrow right" onClick={nextImage}>
              <svg width="20" height="20" viewBox="0 0 16 16">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <img
              ref={imgRef}
              src={product.images[activeImage]}
              className="zoom-image"
              alt=""
            />

            <div ref={lensRef} className="zoom-lens"></div>
          </div>

          {/* thumbnails */}
          <div className="thumbs">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`thumb ${activeImage === index ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
                alt=""
              />
            ))}
          </div>

          <p className="mt-3">{product.details}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div ref={resultRef} className="zoom-preview"></div>
    </>
  );
}
