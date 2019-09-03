import React from "react";
import { ThemeProvider } from "styled-components";

import logo from "./assets/logo.svg";
import { Container, Header, Title, Main, Logo, GlobalStyle } from "./App.styles";
import { Screenings } from "./screenings/Screenings";
import { theme } from "./theme";

export const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Title><Logo src={logo} alt="Pole Star Logo" /></Title>
        </Header>
        <Main>
          <Screenings />
        </Main>
      </Container>
    </>
  </ThemeProvider>
);
