import { Box, Link, Button } from "@chakra-ui/react";
import { MdCall, MdDashboard } from "react-icons/md"
import { FcSalesPerformance } from "react-icons/fc";
import { ImCart } from "react-icons/im";
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { Outlet } from "react-router-dom"; 

function Layout() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; 
  };

  return (
    <div>
      <Box as="nav" bg="teal.500" p={3}>
        <Button leftIcon={<FaHome />} colorScheme="teal"><Link href="/" fontSize="xl" fontWeight="bold" color="white">Home</Link></Button>
        <Button rightIcon={<IoMdLogIn />} colorScheme='green'><Link href="/register" fontSize="md" color="white">Register</Link></Button>
        <Button rightIcon={<IoMdLogIn />} colorScheme='green'><Link href="/login" fontSize="md" color="white">Login</Link></Button>
        <Button rightIcon={<ImCart />} colorScheme='green'><Link href="/product" fontSize="md" color="white">Products</Link></Button>
        <Button leftIcon={<FcSalesPerformance />} colorScheme='green'><Link href="/sales" fontSize="md" color="white">Sales</Link></Button>
        <Button leftIcon={<MdDashboard />} colorScheme='green'><Link href="/dashboard" fontSize="md" color="white">Dashboard</Link></Button> 
        <Button leftIcon={<MdCall />} colorScheme='blue'><Link href="/contact" fontSize="md" color="white">Contact Us</Link></Button>
        <Button rightIcon={<BiLogOutCircle />} colorScheme="green" onClick={handleLogout}><Link href="/logout"fontSize="md" color="black">Logout</Link></Button>
      </Box>
      <Outlet /> 
    </div>
  );
}

export default Layout;
