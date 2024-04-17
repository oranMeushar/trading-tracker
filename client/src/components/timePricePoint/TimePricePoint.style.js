import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
    display:flex;
    flex-direction: column;
    align-items: center;
    border:1px solid black;
    padding: 3vmin 4vmin 1vmin 1vmin;
    min-width: 45vmin;
    /* margin: 1vmin; */
`;

export const Add = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 3vmin;
    cursor: pointer;
    font-weight: 600;
    color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4vmin;
    height: 4vmin;
    border-radius: 50%;
    background-color: lightgreen;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1vmin;
    border: 1px solid black;
    margin-bottom: 1vmin;
    padding-right: 1vmin;
    input{
        border: none;
    }
    input:nth-of-type(2){
        width: 15vmin;
        text-align: center
    }

    :hover .delete-button{
        display: block;
        opacity: 1;
        pointer-events: all;
    }
`;

export const DeleteButton = styled.div`
    font-size: 2vmin;
    opacity: 0;
    pointer-events: none;
    color:red;
    cursor: pointer;

`;
