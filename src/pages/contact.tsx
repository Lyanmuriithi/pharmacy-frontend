import { Box, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box className="container mt-5">
      <Box className="row justify-content-center">
        <Box className="col-md-8">
          <h1>Contact Us</h1>
          <p>Welcome to the contact us page!</p>
          <form>
            <FormControl mb={3}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
