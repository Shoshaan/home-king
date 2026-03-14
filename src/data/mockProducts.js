import img1 from "../assets/products/01.jpg";
import img2 from "../assets/products/04.jpg";
import img3 from "../assets/products/05.jpg";
import img4 from "../assets/products/06.jpg";

export const mockProducts = [
  {
    id: 1,
    name: "Product One",
    price: 100,
    description: "High performance solution.",
    details: "Full technical details for Product One.",
    image: img1,
    images: [img1, img2, img3, img4],
  },
  {
    id: 2,
    name: "Product Two",
    price: 110,
    description: "Industrial grade system.",
    details: "Full technical details for Product Two.",
    image: img2,
    images: [img2, img1, img3, img4],
  },
  {
    id: 3,
    name: "Product Three",
    price: 120,
    description: "Reliable engineering product.",
    details: "Full technical details for Product Three.",
    image: img3,
    images: [img3, img2, img1, img4],
  },
  {
    id: 4,
    name: "Product Four",
    price: 130,
    description: "Reliable engineering product.",
    details: "Full technical details for Product Three.",
    image: img4,
    images: [img4, img2, img3, img1],
  },
];
