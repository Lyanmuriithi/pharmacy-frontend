import { useState } from "react";
import axios from 'axios'; 
import { Box, Button, FormControl, FormLabel, Input, Link as ChakraLink, Center, Card } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
     ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      navigate("/product");
    } catch (error) {
      console.error("Login failed.");
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
        <h1>Welcome to Campers Pharmacy</h1>
        <p>To continue, please log in</p>
      
      <Center minH="80vh">
        <Card w="400px" p="20px" bgColor="">
          <Box>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <FormControl mb={3}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" mb={3}>
                Submit
              </Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
              Don't have an account? <ChakraLink href="/register">Register</ChakraLink>
            </p>
          </Box>
        </Card>
      </Center>
    </div>
  );
}

export default Login;
