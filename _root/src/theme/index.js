import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: "-apple-system, Roboto, Helvetica, Arial, sans-serif",
    fontWeightThin: 100,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  },
  palette: {
    primary: {
      light: "#fd8626",
      main: "#fd8626",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "white"
    },
    secondary: {
      light: "#3c3c3c",
      main: "#3c3c3c",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#fd8626"
    }
  },
  overrides: {
    
  }
});

export default theme;
