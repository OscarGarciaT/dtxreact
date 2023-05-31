import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import store from "./reducer/store";
import AppRouter from "./Components/AppRouter";
import { Provider } from "react-redux";
import DialogStack from "./dialog/DialogStack";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3589A1",
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
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
          <DialogStack />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
