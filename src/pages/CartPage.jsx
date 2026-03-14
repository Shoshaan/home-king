import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

import { Table, Button } from "react-bootstrap";

export const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>

                  <td>${item.price}</td>

                  <td>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </Button>

                    <span className="mx-2">{item.quantity}</span>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </Button>
                  </td>

                  <td>${item.price * item.quantity}</td>

                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>Total: ${totalPrice}</h4>

          <Button variant="success">Checkout</Button>
        </>
      )}
    </div>
  );
};
