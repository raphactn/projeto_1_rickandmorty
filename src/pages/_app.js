// pages/_app.js
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {

  const theme = extendTheme({
    styles: {
      global: (props) => ({
        body: {
          bg: "white",
          minWidth: "500px",
          color: "black",
        },
      }),
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
