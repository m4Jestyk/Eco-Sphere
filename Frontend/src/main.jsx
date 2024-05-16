import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import App from "./App";
import { RecoilRoot } from "recoil";

const styles = {
  global: (props) => ({
    body: {
      color: mode("#FFD700", "#3A3A3A")(props), // Retro gold for light mode, Dark gray for dark mode
      bg: mode("#000000", "#E5E5E5")(props), // Black for light mode, Light gray for dark mode
      fontFamily: "'Press Start 2P', monospace",
      // fontFamily: "'Pixelify Sans', monospace", // Pixelated font choice
      // textRendering: "optimizeSpeed", // Ensures crisp rendering
      // imageRendering: "pixelated", // Renders images in a pixelated manner
      letterSpacing: "0.05em", // Pixelated letter spacing
      // textShadow: mode("0 0 5px #000000", "0 0 5px #FFFFFF")(props), // Subtle text shadow for light mode, Dark mode
      transition: "color 0.3s, background-color 0.3s", // Smooth color transitions
    },
    a: {
      color: mode("#00FF00", "#111111")(props), // Neon green for light mode, Neon green for dark mode
      _hover: {
        color: mode("#FF00FF", "#111111")(props), // Neon pink for light mode, Neon pink for dark mode
      },
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#F2F2F2",
    dark: "#1A1A1A",
  },
};


const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
