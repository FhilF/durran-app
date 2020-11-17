import { createMuiTheme } from "@material-ui/core/styles";
import {
  red,
  green,
  pink,
  orange,
  blue,
  lightBlue,
  deepOrange,
} from "@material-ui/core/colors";

const theme = createMuiTheme({
  custom: {
    boxShadow: "0 10px 15px 0 #11131b",
    border: "5px solid #2FF9AF",
    cardBg: "#181a21",
    hoverCardBg: "#191c23",
    font1: {
      fontFamily: "'IBM Plex Sans', sans-serif",
    },
    font2: {
      fontFamily: "'Poppins', sans-serif",
    },
  },
  typography: {
    useNextVariants: true,
  },
  spacing: 4,
  palette: {
    type: "dark",
    text: {
      primary: "#ffffff",
      secondary: "#a5a5a5",
    },
    background: {
      default: "#191b25",
      paper: "#191b25",
    },
    action: {
      hover: "#242425",
    },
    divider: "#303030",
    primary: {
      lighter: "#93ffd8",
      main: "#2FF9AF",
      darker: "#2BE09E",
    },
    secondary: {
      main: "#FA8216",
      // main: "#2FF9AF",
    },
    success: {
      main: "#2BE09E",
    },
    warning: {
      main: orange[400],
    },
    info: {
      main: lightBlue[400],
    },
    error: {
      main: red[400],
    },
  },
  props: {
    MuiTypography: {
      h1: {
        fontSize: "5rem",
      },
      variantMapping: {
        h1: "h1",
        h2: "h2",
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
        subtitle1: "h2",
        subtitle2: "h2",
        body1: "span",
        body2: "span",
      },
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: "5rem",
      },
      h4: {
        fontWeight: 600,
        fontSize: "30px",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffff !important",
      },
      h5: {
        fontSize: "20px",
        color: "#ffffff !important",
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: ".6px",
      },
      h6: {
        fontWeight: 400,
        fontSize: "15px",
        fontFamily: "'Poppins', sans-serif",
      },
      p: {
        fontFamily: "'Poppins', sans-serif",
      },
      body1: {
        fontWeight: 300,
        fontSize: "13px",
        fontFamily: "'Poppins', sans-serif",
      },
      body2: {
        fontWeight: 300,
        fontSize: "13px",
        fontFamily: "'Poppins', sans-serif",
        color: "#2FF9AF"
      },
      subtitle1: {
        fontWeight: 200,
        fontSize: "13px ",
        fontFamily: "'Poppins', sans-serif",
        color: "#2FF9AF",
        letterSpacing: ".8px",
      },
      subtitle2: {
        fontWeight: 200,
        fontSize: "11px ",
        fontFamily: "'Poppins', sans-serif",
        color: "#a5a5a5 !important",
      },
    },
    MuiDivider: {
      root: {},
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      containedPrimary: {
        "& .MuiButton-label": {
          color: "#191b25",
        },
        backgroundColor: "#2BE09E",
        "&:hover": {
          backgroundColor: "#00ad6e !important",
        },
      },
    },

    MuiInput: {
      input: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        fontSize: "14px",
      },

      root: {
        "&:hover:not($disabled):before": {
          borderColor: "#2BE09E !important", //its when you hover and input is not foucused
          borderWidth: "3px !important",
        },
        "&:before": {
          borderColor: "#303030 !important", // when input is not touched
        },

        "&:after": {
          borderWidth: "3px !important",
        },
      },

      multiline: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        fontSize: "14px",
        "&:hover:not($disabled):before": {
          borderColor: "#2BE09E", //its when you hover and input is not foucused
          borderWidth: "3px",
        },
        "&:before": {
          borderColor: "#303030", // when input is not touched
        },

        "&:after": {
          borderWidth: "3px",
        },
      },
    },
  },
});

export default theme;
