import styled from '@emotion/styled';

export const Container = styled.div`
    width: 42vmin;
    border-radius: 0.8rem;
    padding: 1vmin;
    padding-right: 0;
    border:none;
    border-right: 0.5vmin solid black;
    border-bottom: 0.2vmin solid black;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    justify-content: space-between;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    .second_title{
        margin-top: 1.5vmin;
    }
    /* background:white; */

    /* background:#F2F2F2; */
    /* background:#E5E5E5; */
    /* background:linear-gradient(to bottom, #172a5c,#F2F2F2); */

`;

export const Title = styled.div`
    p{
        white-space: nowrap;
        /* color: grey; */

        /* color: #333333; */
        color: #172a5c;
        /* color: #FF4500; */
        margin-bottom: 0.5vmin;
        font-size: 1.5vmin;
    }
    span{
        font-size: 2vmin;
        font-weight: 600;
        /* color:#666666; */
        color: #333333;
        /* color: #333333; */
    }
`;