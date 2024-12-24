import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

const theme = extendTheme({
  fonts: {
    heading: `'Inter',sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      "html, body, #root": {
        height: "100%", // Ensures that height propagates to child elements
        margin: 0,
        padding: 0,
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LandingPage />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
