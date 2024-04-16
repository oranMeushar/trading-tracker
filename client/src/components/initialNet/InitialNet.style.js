import styled from '@emotion/styled';

export const Container = styled.div`
    width:50vmin;
    margin:0 auto;
    background-color: white;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:3vmin;
    padding:3vmin;
    >p{
        font-size:2.5vmin;
        font-weight:600;
        text-align:center;
        line-height:3.2vmin;
    }
    >input{
        width:100%;
        height:5vmin;
        border-radius:1vmin;
        border:1px solid #d3d3d3;
        padding:0 1vmin;
        font-size:2vmin;
        font-weight:600;
        outline:none;
        &:focus{
            border:1px solid #a3a3a3;
        }
    }
    >button{
        width:100%;
        height:5vmin;
        border-radius:1vmin;
        border:none;
        background-color:#1e90ff;
        color:white;
        font-size:2vmin;
        font-weight:600;
        outline:none;
        cursor:pointer;
        &:hover{
            background-color:#1e90ffcc;
        }
    }
`;