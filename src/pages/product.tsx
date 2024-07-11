import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Text } from "@chakra-ui/react";

interface Product {
  id: number;
  name: string;
  price: number;
  user_id: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "http://165.232.46.123:5000/products";
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await axios.get<Product[]>(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiUrl = `http://127.0.0.1:5000/products?search=${searchTerm}`;
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.get<Product[]>(apiUrl, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div>
      <Text as="h1" textAlign="center" fontWeight="bold" mb={4}>Products</Text>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <form className="d-flex" role="search" onSubmit={handleSearch} style={{ justifyContent: 'flex-end' }}>
            <Input
              variant="outline"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" colorScheme="teal" ml={2}>
              Search
            </Button>
          </form>
        </div>
      </nav>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>User ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.user_id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Products;
