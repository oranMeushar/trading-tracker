import styled from '@emotion/styled';

export const Container = styled.div`
    /* background-color: ${({isSucces})=>isSucces ? '#D6F5D6' : '#F5D6D6'}; */
    /* height: ${({isScaled})=> isScaled ? '40vmin' : '10vmin'}; */
    /* width:${({isScaled})=> isScaled ? '100vmin' : '75vmin'}; */
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
    padding: 2vmin;
    transition: height 0.5s ease-in-out, width 0.5s ease-in-out;
    overflow: hidden;
    margin-bottom: 3vmin;
    border:${({isSucces})=>isSucces ? '3px solid #4CAF50' : '3px solid #F44336'};
    width: 75%;
    margin: 3vmin auto;
    position: relative;

    a{
        position: absolute;
        bottom: 2vmin;
        right: 2vmin;
        font-size: 2.5vmin;
        font-weight: 600;
        text-decoration: none;
        color: blue;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4vmin;
    margin-bottom: 2vmin;
    border-bottom: 1px solid grey;
`;

export const HeaderTitle = styled.div`
    font-size: 2.5vmin;

    >span:nth-of-type(1){
        font-weight: 600;
        border-right: 1px solid grey;
        padding-right: 0.5vmin;
        
    }
    >span:nth-of-type(2){
        padding-left: 0.5vmin;
    }
`;


export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2vmin;
    font-size: 2.5vmin;
    >img{
        width: 3vmin;
        height: 3vmin;
    }
`;

export const UpArrow = styled.div`
    width: 0;
    height: 0;
    border-left: 1vmin solid transparent;
    border-right: 1vmin solid transparent;
    border-bottom: 1.5vmin solid black;
    cursor: pointer;
`;

export const DownArrow = styled.div`
    width: 0;
    height: 0;
    border-left: 1vmin solid transparent;
    border-right: 1vmin solid transparent;
    border-top: 1.5vmin solid black;
`;

export const Body = styled.div`
    display: flex;
    align-items: center;
`;

export const BreakLine = styled.div`
    width: 100%;
    height: 0.2vmin;
    background-color: lightgray;
`;

export const ImageContainer = styled.div`
    margin-right: 4vmin;
    img{
        width: 35vmin;
        height: 20vmin;
    }
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 4vmin;
    /* justify-items: flex-end; */
    >div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4vmin;
        padding-right: 1vmin;
        :not(:nth-of-type(4n)){
            border-right: 1px solid grey;
        }
        
    }
    
    span{
        /* border-right: 1px solid grey; */
        /* display:block; */
        font-weight: 600;
        font-size: 2.5vmin;
        justify-self: flex-start;
    }
`;
