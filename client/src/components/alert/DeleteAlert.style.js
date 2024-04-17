import styled from '@emotion/styled';

export const Container = styled.div`
    padding:2vmin;
    background-color:white;
    width:45vmin;
    border-radius: 0.5rem;

    >p{
        font-size: 3vmin;
        text-align: center;
    }
`;

export const ButtonsContainer = styled.div`

    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:6vmin;
    gap:2vmin;
    button{
        outline: none;
        border:1px solid black;
        padding:0.5vmin 1vmin;
        border-radius: 0.6rem;
        font-size: 3vmin;
        cursor: pointer;
    }

    button:nth-of-type(1){
        background-color: #D72727;
        color:white;
    }

    button:nth-of-type(2){
        background-color:#f2f2f2
    }
`;