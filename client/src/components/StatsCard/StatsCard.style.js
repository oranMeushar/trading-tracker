import styled from '@emotion/styled';

export const Container = styled.div`
    grid-row: 1 / 3;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size:1.65vmin;
    padding:0 1vmin;
    >p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-self: flex-start;
        font-weight: 600;
    }
    >p span{
        display:block;
        font-weight: 400;
    }
    
`;

export const Header = styled.div`
    font-size: 2.5vmin;
    font-weight: 600;
    color: #172a5c;
    align-self: center;
`;
export const Item = styled.div`
    border:1px solid red;
    

`;
