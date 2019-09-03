import { styled } from "../../theme";

export const StyledSelect = styled.select`
  ${({ theme }) => `
    height: 1.5rem;
    vertical-align: top;
    background-color: ${theme.colors.controlBackground};
    border: solid 1px  ${theme.colors.controlBorder};
    border-radius: ${theme.borders.radius}rem;
    color: ${theme.colors.foreground};
    padding: ${theme.spacing.small}rem;
    outline: none;
    -moz-appearance: none;
    text-indent: 0.01px;
    text-overflow: '';

    &:hover,
    &:focus {
      border-color: ${theme.colors.highlight};
    }
  `}
`;
