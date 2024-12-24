import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.900" color="white" py={6} textAlign="center">
      <Text fontSize="lg" fontWeight="bold">
        Muntasir Hossen
      </Text>
      <Text fontSize="sm" mt={2}>
        © {new Date().getFullYear()} All Rights Reserved.
      </Text>
      <Text fontSize="xs" mt={1}>
        Designed and built by Muntasir Hossen
      </Text>
    </Box>
  );
};

export default Footer;
