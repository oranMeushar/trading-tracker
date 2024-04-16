import styled from '@emotion/styled';

export const Container = styled.div`
    /* margin-top: 1vmin; */
    display: flex;
    flex-direction: column;
    min-height: 95vh;
    padding-top: 1vmin;
`;

export const Charts = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2vmin;
    padding: 0 2vmin 1vmin 2vmin;
`;
