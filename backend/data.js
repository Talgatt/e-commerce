import bcrypt from "bcryptjs";

const data = {
  user: [
    {
      name: "Talgat",
      email: "tal@gmail.com",
      isAdmin: true,
      password: bcrypt.hashSync("123", 7),
    },
    {
      name: "Dilyara",
      email: "dil@gmail.com",
      isAdmin: false,
      password: bcrypt.hashSync("123", 7),
    },
  ],

  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 120,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      countInStock: 3,
      description: "high quality product",
    },
    {
      name: "Adidas Slim Shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 150,
      brand: "Nike",
      rating: 4,
      numReviews: 10,
      countInStock: 10,
      description: "high quality product",
    },
    {
      name: "Lacoste Free Shirt",
      category: "Shirts",
      image: "/images/p3.jpg",
      price: 100,
      brand: "Nike",
      rating: 4.5,
      numReviews: 13,
      countInStock: 5,
      description: "high quality product",
    },
    {
      name: "Pants Slim Shirt",
      category: "Shirts",
      image: "/images/p4.jpg",
      price: 220,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      countInStock: 0,
      description: "high quality product",
    },
    {
      name: "Adidas Slim Fit Shirt",
      category: "Pants",
      image: "/images/p5.jpg",
      price: 130,
      brand: "Nike",
      rating: 4.5,
      numReviews: 60,
      countInStock: 10,
      description: "high quality product",
    },
  ],
};

export default data;
