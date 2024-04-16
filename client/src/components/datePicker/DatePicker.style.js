import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
    /* border: 1px solid lightgray; */
    border:1px solid #666666;
    width:fit-content;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0rem 1rem;
    border-radius: 0.3rem;

    >input{
        border: none;
        outline: none;
        font-size: 1.5vmin;
        padding: 0.5vmin 1vmin;
        cursor: pointer;
        width: 28vmin;
        text-align: center;
        background-color: transparent;
        color:#172a5c;
    }
    img{
        width: 3.7vmin;
        height: 3.7vmin;
    }

    .date-picker{
        /* position: absolute; */
        /* top: 100%; */
        /* left: 0; */
    }
`;