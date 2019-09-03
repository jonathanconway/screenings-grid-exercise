import { styled, theme } from "../../theme";

interface ContainerStyleProps {
  readonly size?: "small" | "medium";
  readonly color?: keyof (typeof theme.colors);
}

export const Container = styled.span<ContainerStyleProps>`
  ${({ theme, color, size }) => {
    const diameter = size === "small" ? 0.8 : 1.2;

    return `
      display: inline-block;
      vertical-align: top;
      line-height: 0.8rem;
      width: ${diameter}rem;
      height: ${diameter}rem;

      .icon {
        cursor: pointer;
        background: 0;
        border: 0;
        position: relative;
        padding: 0;
        margin: 0;
        color: ${color ? theme.colors[color] : theme.colors.foreground};
        width: ${diameter}rem;
        height: ${diameter}rem;
      }

      &:hover {
        .icon {
          color: ${!color && theme.colors.highlight};
        }
      }

      b {
        text-indent: -10000rem;
        display: inline-block;
      }
    `;
  }}
`;
