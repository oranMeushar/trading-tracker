import styled from '@emotion/styled';

export const LoadingSpinnerContainer = styled.div`
  position: fixed;
  height: 100%;
  z-index: 100;
  left:50%;
  transform: translateX(-50%);
  top:${({topPosition}) => topPosition};
`;