import { useState } from "react";
import axios from 'axios'; 
import { Box, Button, FormControl, FormLabel, Input, Link as ChakraLink, Center, Card } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleInputChange(e: { target: { name: any; value: any; }; }) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      const { username } = response.data;
      console.log(`User ${username} has been registered successfully.`);
      navigate('/login');
    } catch (error) {
      console.error("Registration failed.");
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Box textAlign="center" marginTop={50}>
        <h1>Register for Campers Pharmacy</h1>
        <p>Create your account</p>
      </Box>
      <Center minH="80vh">
        <Card w="400px" p="20px" bgColor="gray.200">
          <Box>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <FormControl mb={3}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
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
                Register
              </Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
              Already have an account? <ChakraLink href="/login">Login</ChakraLink>
            </p>
          </Box>
        </Card>
      </Center>
    </div>
  );
}

export default Register;
