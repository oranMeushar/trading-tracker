import styled from '@emotion/styled';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index:100;
  display: grid;
  place-items: center;
`;


export const ModalChildren = styled.div`
  position: relative;
  z-index: 10;
  width:${({width}) => width && width};
`;