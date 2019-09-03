import { styled } from "../../theme";

export const rowHeight = 25;
export const gridBorderWidth = 1;

export const Container = styled.div`
  ${({ theme }) => `
    height: 100%;
    position: relative;

    .ReactVirtualized__Table {
      display: inline-block;
    }

    .ReactVirtualized__Table__row {
      display: flex;
      box-orient: horizontal;
      flex-direction: row;
      align-items: center;
      border-bottom: solid 1px black;
    }

    .ReactVirtualized__Table__headerRow {
      color: white;
      font-weight: bold;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      box-orient: horizontal;
      box-direction: normal;
      flex-direction: row;
      box-align: center;
      align-items: center;
    }

    .ReactVirtualized__Table__headerColumn,
    .ReactVirtualized__Table__rowColumn {
      min-width: 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: ${theme.typography.fontSize.small}rem;
    }

    .ReactVirtualized__Grid {
      outline: none;
    }
  `}
`;

interface CellStyleProps {
  readonly isLastRow: boolean;
  readonly isFrozenColumn: boolean;
  readonly isFrozenRow: boolean;
}

export const Cell = styled.div<CellStyleProps>`
  ${({ theme, isLastRow, isFrozenRow, isFrozenColumn }) => `
    display: inline-block;  
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.colors.table.foreground};
    font-size: ${theme.typography.fontSize.small}rem;
    line-height: 1rem;
    padding: 0.25rem 0.5rem;
    background-color: ${theme.colors.table.background};
    border-left: solid ${gridBorderWidth}px ${theme.colors.border};
    border-top: solid ${gridBorderWidth}px ${theme.colors.border};
    box-sizing: border-box;

    ${isLastRow ? `
      border-bottom: solid ${gridBorderWidth}px ${theme.colors.border};
    ` : ``}

    ${isFrozenRow ? `
      background-color: ${theme.colors.screen.background};
      border: 0;
      cursor: pointer;
    ` : ``}

    ${isFrozenColumn ? `
      background-color: ${theme.colors.table.background2};
      color: #bac7d0;
    ` : ``}
  `}
`;

export const NoItemsMessage = styled.div`
  ${({ theme }) => `
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -10rem;
    margin-top: -2rem;
    width: 20rem;
    height: 4rem;
    text-align: center;
    font-size: ${theme.typography.fontSize.small}rem;
  `}
`;