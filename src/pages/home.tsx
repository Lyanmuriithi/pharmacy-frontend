import { Box, Center } from "@chakra-ui/react";
import Login from "./login";

const Home: React.FC = () => {
  return (
    <Center minH="100vh">
      <Box>
        <Login />
      </Box>
    </Center>
  );
};

export default Home;
