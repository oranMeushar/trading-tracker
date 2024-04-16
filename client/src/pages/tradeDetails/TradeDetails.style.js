import styled from '@emotion/styled';

export const Container = styled.div`
    padding:4vmin 4vmin 0vmin 4vmin;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 2vmin;

    button:nth-of-type(1){
        margin-right: auto;
    }
    margin-bottom: 1vmin;

`;
export const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 1vmin;
    padding: 0.5vmin 1vmin;
    border-radius: 0.5vmin;
    outline: none;
    border: 1px solid black;
    background-color: white;
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
    font-size: 2.5vmin;

`;

// create back arrow with no body
export const BackArrow = styled.div`
    border: ${({disabled}) => disabled ? 'solid gray' : 'solid black'};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
`;

export const NextArrow = styled.div`
    border: ${({disabled}) => disabled ? 'solid gray' : 'solid black'};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
`;
export const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1.1fr;
    /* grid-template-rows: 0.1fr 1fr; */
    column-gap: 1vmin;
    border:1px solid gray;
    padding: 2vmin;
    position:relative;
    /* height: 85vh; */

    .trash{
        position: absolute;
        top: 1vmin;
        right: 1vmin;
        width: 5vmin;
        height: 5vmin;
        cursor: pointer;
    }
`;
export const Content = styled.div`
    /* border:1px solid gray; */
    font-size: 2vmin;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8vmin;
    padding: 1vmin;


    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    span{
        font-weight: bold;
    }
`;
export const Image = styled.img`
    width: 100%;
    height:75vmin;
    /* object-fit: cover;  */
    justify-self: flex-end;
`;

export const Top = styled.div`
    grid-column: 1/-1;
    font-size: 2vmin;
    display: flex;
    flex-direction: column;
    gap: 1vmin;
`;

