import styled from '@emotion/styled';

export const Container = styled.div`
    height: 95vh;
    padding: 1vmin;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 1vmin;
    /* justify-content: space-between; */
`;

export const CardsContainer = styled.div`
    display: flex;
    width: 100%;
    /* gap: 1vmin; */
    justify-content: space-evenly;
`;
export const CardContainer = styled.div`
`;
export const ChartsContainer = styled.div`
    display: grid;
    grid-template-columns: 0.1fr 0.45fr 0.45fr;  
    width: 100%;
    gap: 1vmin;
    row-gap: 2vmin;
    flex: 1;
    >:nth-child(2){
        grid-column: 2 / -1;
    }
`;

export const StatsContainer = styled.div`
    grid-row: 1 / 3;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-size:2vmin;
`;