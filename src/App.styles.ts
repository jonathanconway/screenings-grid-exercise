import { styled, Theme } from "./theme";
import{ createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.appBackground};
    color: ${({ theme }) => theme.colors.foreground};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    display: flex;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.header`
  height: 1rem;
  color: white;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.large}rem;
  margin: 0;
`;

export const Logo = styled.img`
  height: 1.5rem;
  float: right;
  margin: 0.5rem 1rem;
`;

export const Main = styled.main`
  display: flex;
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium}rem;
  box-sizing: border-box;
`;