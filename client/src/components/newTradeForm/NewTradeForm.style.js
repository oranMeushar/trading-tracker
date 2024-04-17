import styled from '@emotion/styled';

export const Container = styled.div`
    background-color: #F2F2F2;
    display: grid;
    grid-template-columns: 1fr;
    padding: 2vmin;
    column-gap: 5vmin;
    row-gap: 3.5vmin;
    height: 95vh;
    overflow-y: auto;
    color:#172a5c;
    border-radius: 0.6rem;

    ::-webkit-scrollbar {
        width: 20px;
    };
    
    ::-webkit-scrollbar-thumb {
    background: #172a5c;
    border-radius: 100px;
    background-clip: padding-box;
    border: 6px solid rgba(0, 0, 0, 0);
  }

    /* .label-center{
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
    }

    .time-price-point{
        grid-column: 1 / -1;
        justify-self: center;

    } */

    .react-date-picker__wrapper{
        border-radius: 0.6rem;
        padding: 0.5vmin 1vmin;
        border:1px solid black;

    }

    .date-picker{
        width: 100%;
    }
    .date-picker input {
        border: none;
        /* width: 40vmin; */

        
    }

    
`;

export const Header = styled.div`
    grid-column: 1 / -1;
    font-size: 3vmin;
    font-weight: 600;
    justify-self: center;
`;
export const Label = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    font-size: 2.5vmin;
    /* width: 100%; */
    gap: 1vmin;

    >p{
        font-weight: 500;
        font-size: 2.3vmin;
    }
    >input{
        border:1px solid black;
        padding:0.8vmin 1vmin;
        width: 100%;
        font-size: 2.4vmin;
        background:transparent;
        border-radius: 0.6rem;
    }
`;

export const FileInput = styled.input`
    display: none;
`;

export const ImagePreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:1vmin;
    margin:0 auto;
    button{
        background: none;
        outline:none;
        border:1px solid black;
        padding:0.5vmin 1vmin;
        border-radius: 0.6rem;
        cursor:pointer;
        font-size: 2.3vmin;
        
    }
`;

export const ImageContainer = styled.div`
    position:relative;
    border:1px solid black;
    width:25vmin;
    height:25vmin;

    :hover .trash{
        opacity: 1;
        pointer-events: all;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const TrashImage = styled.img`
    position: absolute;
    top:0;
    left: 0;
    width: 25px;
    height: 25px;
    opacity: 0;
    pointer-events: none;
    cursor: pointer;
`;
export const SubmitButton = styled.div`
    grid-column: 1 / -1;
    justify-self: center;
    font-size: 2.5vmin;
    border:1px solid black;
    padding:0.5vmin 1vmin;
    border-radius: 0.6rem;
    cursor:pointer;

`;