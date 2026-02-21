import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../productsSlice";
import { Container, Row } from "react-bootstrap";
import {ProductCard} from "../components/ProductCard";
import {ProductModal} from "../components/ProductModal";

export function ProductsPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container className="mt-5 pt-5">
      <h2 className="text-center mb-4">Our Products</h2>
      <Row>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
      <ProductModal />
    </Container>
  );
}
