import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Text } from "@chakra-ui/react";

// Define the Sale interface based on your model
interface Sale {
  id: number;
  product_id: number;
  stock_quantity: number;
  created_at: Date;
  user_id: number;
}

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const apiUrl = "http://127.0.0.1:8000/sales"; // Ensure this matches your FastAPI server address
        const accessToken = localStorage.getItem("accessToken"); // Make sure you're handling authentication properly
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await axios.get<Sale[]>(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiUrl = `http://165.232.46.123:5000/sales?search=${searchTerm}`; // Adjust the query parameter as needed
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.get<Sale[]>(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSales(response.data);
    } catch (error) {
      console.error("Error searching sales:", error);
    }
  };

  return (
    <div>
      <Text as="h1" textAlign="center" fontWeight="bold" mb={4}>Sales</Text>
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
            <Th>Product ID</Th>
            <Th>Stock Quantity</Th>
            <Th>Created At</Th>
            <Th>User ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sales.map((sale) => (
            <Tr key={sale.id}>
              <Td>{sale.id}</Td>
              <Td>{sale.product_id}</Td>
              <Td>{sale.stock_quantity}</Td>
              <Td>{sale.created_at.toLocaleString()}</Td>
              <Td>{sale.user_id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Sales;
