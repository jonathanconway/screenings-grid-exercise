import { styled } from "../../theme";

export const SpinnerIcon = styled.span`
  ${({ theme }) => `
    animation: App-logo-spin infinite 1s linear;
    position: absolute;
    margin-left: -1.5rem;
    margin-top: -1.5rem;
    left: 50%;
    top: 50%;
    width: 3rem;
    height: 3rem;
    font-weight: bold;
    border-radius: 100%;
    border: solid ${theme.borders.size.thick}rem transparent;
    border-left: solid ${theme.borders.size.thick}rem ${theme.colors.foreground};

    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;
