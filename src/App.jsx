import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./Components/AppRouter";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#39CAB0",
    },
    secondary: {
      main: "#CA5E39",
    },
    text: {
      secondary: "#696969",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightMedium: 600,
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Router>
  );
}

export default App;
