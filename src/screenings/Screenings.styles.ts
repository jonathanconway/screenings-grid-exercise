import { styled } from "../theme";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h2`
  position: absolute;
  margin: 0;
  padding: 0.25rem 0.5rem;
  height: ${({ theme }) => theme.sizing.small.height}rem;
  top: 0;
  left: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.small}rem;
  background-color: ${({ theme }) => theme.colors.screen.background};
  font-weight: normal;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.highlight}
`;

export const Body = styled.div`
  flex: 1; 
  padding: 0.5rem;
  margin-top: ${({ theme }) => theme.sizing.small.height + theme.spacing.medium}rem;
  background-color: ${({ theme }) => theme.colors.screen.background};
`;

export const FilterGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  & > * {
    &:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacing.small}rem;
    }
  }
`;
