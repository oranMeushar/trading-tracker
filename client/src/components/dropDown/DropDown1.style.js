import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import Select from 'react-dropdown-select';


export const Container = styled.div`
    position: relative;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1vmin;
    .custom-select .react-dropdown-select-option{
        border-radius: 0.4rem;
    }

    .react-dropdown-select-clear{
      line-height: 0;
    }

    .react-dropdown-select.first{
      /* padding: 0.1vmin 1.2vmin; */
    }

    .react-dropdown-select{
      border:1px solid #666666;
      min-height: 0;
      padding: 0.5vmin 1vmin;
      /* border:1px solid #CCCCCC; */
    }
    color:#172a5c;
    font-size: 1.5vmin;
    /* color:#CCCCCC; */
`;




export const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5vmin 1vmin;
    cursor: pointer;
    /* background-color:#F5F5F5; */
    color:#172a5c;
    
    :hover{
        background-color: #E5E5E5;
    }
    input{
        margin-right: 1vmin;
    }
    
`;
export const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
    
    /* input[type="text"]{
        display: block;
        margin-top: 0.5vmin;
        background:none;
        border: none;
        font-size: 1vmin;
        color:#172a5c;
        ::placeholder{
            font-size: 1.2vmin;
        }
    } */
`;

export const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;
  color:#172a5c;
  
  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    :focus {
      outline: none;
      border: 1px solid ${({ color }) => color};
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    margin: 10px 0 0 10px;
    font-weight: 600;
  }
`;

export const Button = styled.button`
  background: none;
  border: 1px solid #555;
  color: #555;
  border-radius: 3px;
  margin: 10px 10px 0;
  padding: 3px 5px;
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;

  &.clear {
    color: tomato;
    border: 1px solid tomato;
  }

  :hover {
    border: 1px solid deepskyblue;
    color: deepskyblue;
  }
`;

export const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
`;

export const Item = styled.div`
  display: flex;
  margin: 10px;
  align-items: baseline;
  cursor: pointer;
  border-bottom: 1px dotted transparent;
  color:#172a5c;
  :hover {
    border-bottom: 1px dotted #ccc;
  }

  ${({ disabled }) =>
    disabled
      ? `
  	opacity: 0.5;
  	pointer-events: none;
  	cursor: not-allowed;
  `
      : ""}
`;

export const ItemLabel = styled.div`
  margin: 5px 10px;
`;








const hide = keyframes`
  0% {
    transition: all 0.3s ease-out;
  }
  100% {
    top:-50%;
    opacity: 0;
    transition: all 0.3s ease-out;
  }
`;

const show = keyframes`
  0% {
    top:-50%;
    opacity: 0;
    transition: all 0.3s ease-out;
  }
  100% {
    opacity: 1;
    transition: all 0.3s ease-out;
  }
`;

export const StyledSelect = styled(Select)`
  transition: all 0.3s ease-out;

  .react-dropdown-select-dropdown {
    
    ${({ isOpen }) =>isOpen
        ? css`animation: ${hide} 310ms ease-in-out;`
        : css`animation: ${show} 310ms ease-in-out;`
    };
  }
  .react-dropdown-select-option {
    transition: all 0.3s ease-out;
  }
`;