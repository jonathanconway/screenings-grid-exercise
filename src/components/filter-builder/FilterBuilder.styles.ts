import { styled } from "../../theme";
import { Select } from "../select/Select";
import { Input } from "../input/Input";

export const Container = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-wrap: wrap;
    padding: ${theme.spacing.xsmall}rem 0 0 ${theme.spacing.xsmall}rem;
    border: solid 1px ${theme.colors.border};
    border-radius: ${theme.borders.radius}rem;

    &:focus,
    &:focus-within,
    &:hover {
      border-color: ${theme.colors.highlight};
    }
  `}
`;

export const Filter = styled.div`
  ${({ theme }) => `
    display: inline-flex;
    margin: 0 ${theme.spacing.xsmall}rem ${theme.spacing.xsmall}rem 0;
    padding: ${theme.spacing.xsmall}rem;
    border: solid 1px ${theme.colors.border};
    border-radius: ${theme.borders.radius}rem;
    font-size: ${theme.typography.fontSize.medium}rem;

    &:not(:last-child) {
      margin-right: ${theme.spacing.small}rem;
    }

    &:focus,
    &:focus-within,
    &:hover {
      border-color: ${theme.colors.highlight};
    }

    & > * {
      &:not(:last-child) {
        margin-right: ${theme.spacing.small}rem;
      }
    }
  `}
`;

export const FilterBody = styled.span`
  display: inline-block;
`;

export const FilterName = styled.span`
`;

export const FilterOperator = styled.span`
`;

export const FilterValue = styled.span`
`;

export const FilterFieldSelect = styled(Select)`
`;

export const FilterOperatorSelect = styled(Select)`
`;

export const FilterValueInput = styled(Input)`
`;

export const FilterValueSelect = styled(Select)`
`;

export const DeleteFilterButton = styled.span`
  ${({ theme }) => `
    display: inline-flex;
    align-items: center;
    height: 1.5rem;
  `}
`;

export const AddFilterButton = styled.span`
  ${({ theme }) => `
    display: inline-flex;
    align-items: center;
    height: 1.95rem;
    width: 1.95rem;
    border-radius: ${theme.borders.radius}rem;
    justify-content: center;

    &:hover {
      background-color: ${theme.colors.buttonHover};
    }
  `}
`;
