import { styled } from "../../../theme";

export const StyledHeaderCell = styled.span`
  ${({ theme }) => `
    display: inline-block;
    width: 100%;

    .icon {
      margin: 0.125rem;
      margin-left: 0.5rem;
    }

    &:hover {
      .icon {
        color: ${theme.colors.highlight};  
      }
    }

    .hint {
      display: none;
    }

    &:hover {
      color: ${theme.colors.highlight};

      .hint {
        display: inline-block;
      }
    }
  `}
`;

export const Label = styled.span`
`

export const SortButton = styled.span`
  display: inline-block;
  vertical-align: top;
  margin: 0.12rem;
  margin-left: 0.5rem;
`