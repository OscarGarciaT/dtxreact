import { BrowserRouter as Router } from "react-router-dom";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import store from "./reducer/store";
import AppRouter from "./Components/AppRouter";
import { Provider } from "react-redux";
import DialogStack from "./dialog/DialogStack";

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
    MuiPopper: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
    MuiDialog: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
    MuiModal: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
  },
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
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
            <DialogStack />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
}

export default App;
