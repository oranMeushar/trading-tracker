import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vmin 1vmin;
    border: 1px solid black;
    border-radius: 0.6rem;
    width: 100%;
    >p{
        font-size: 2vmin;
        color: black;
        font-weight: 500;
    }
`;


export const DownArrow = styled.div`
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(45deg);
`; 

export const UpArrow = styled.div`
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(-135deg);
`;

export const List = styled.div`
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background-color: #F2F2F2;
    border-radius: 0.4rem;
    padding: 1vmin 0;
    box-shadow: 0 0 0.5vmin 0.1vmin rgba(0,0,0,0.2);
    z-index: 1;
    P{
        width: 100%;
        padding: 1vmin 2vmin;
        :hover{
            background-color: #E5E5E5;
        }
        cursor: pointer;
    }
`;
