import baseStyled, { ThemedStyledInterface } from "styled-components";

const typography = {
  fontSize: {
    xsmall: 0.5,
    small: 0.7,
    medium: 0.8,
    large: 1,
    xlarge: 1.5
  } 
};

const spacingBase = 1;
const spacing = {
  xsmall: spacingBase / 6,
  small: spacingBase / 4,
  medium: spacingBase / 2,
  large: spacingBase
};

const sizing = {
  small: {
    height: 1
  },
  medium: {
    height: 2
  }
};

const borders = {
  size: {
    thick: 0.5
  },
  radius: 0.25
};

const colors = {
  highlight: "#80FFE6",
  border: "#4c5459",
  appBackground: "#111314",
  foreground: "#ffffff",
  screen: {
    background: "#1d2022",
    title: "#80FFE6"
  },
  table: {
    background: "#343a3e",
    background2: "#292d30",
    foreground: "#ffffff",
  },
  red: "#fd618b",
  orange: "#fba556",
  green: "#a4e57f",
  blue: "#7eb3ee",
  buttonHover: "#292d30",
  controlBackground: "#343a3e",
  controlBorder: "#97a1a7"
}

const theme = {
  typography,
  spacing,
  sizing,
  borders,
  colors
};

export { theme };

export type Theme = typeof theme;

export const styled = baseStyled as ThemedStyledInterface<Theme>;