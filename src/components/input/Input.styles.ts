import { styled } from "../../theme";

export const StyledInput = styled.input`
  ${({ theme }) => `
    height: 0.85rem;
    vertical-align: top;
    background-color: ${theme.colors.controlBackground};
    border: solid 1px  ${theme.colors.controlBorder};
    border-radius: ${theme.borders.radius}rem;
    color: ${theme.colors.foreground};
    padding: ${theme.spacing.small}rem;
    outline: none;

    &:hover,
    &:focus {
      border-color: ${theme.colors.highlight};
    }
  `}
`;
