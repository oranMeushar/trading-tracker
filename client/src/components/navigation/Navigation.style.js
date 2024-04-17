import styled from '@emotion/styled';
export const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    gap:3vmin;
    padding: 0.5vmin 2vmin;
    /* background-color: #212337; */

    /* background-color: #FFFFFF; */
    background: linear-gradient(to bottom, #FFFFFF, #F5F5F5);
    /* background-color: #FFD700; */
    /* background-color: #8B008B; */
    /* background-color: #FF4500; */
    
    /* border-bottom: 0.2vmin solid #172a5c; */
    box-shadow: 0 0.2vmin 0.2vmin rgba(0,0,0,0.2);
`;

export const Label = styled.div`
    display: flex;
    align-items: center;
    gap:1vmin;
    padding: 0.2vmin 1vmin;
    position: relative;
    border-radius: 0.4rem;
    /* background-color:${({isSelected}) => (isSelected ? '#46495C' : 'transparent')}; */
    /* :hover{ */
        /* background-color: #46495C; */

        /* background-color: #0D47A1; */
        /* background-color: #FFC107; */
        /* background-color: #AD1457; */
        /* background-color: #FF5722; */
    /* } */

    /* :hover a{ */
        /* color: #FFFFFF; */
        /* color: #172a5c; */
        /* color: #FFFFFF; */
        /* color: #FFFFFF; */
    /* } */
    a{
        font-size: 2vmin;
        text-decoration: none;
        /* color: white; */
        
        color:#172a5c;
        /* color:#172a5c */
        /* color:#FFFFFF */
        /* color:#FFFFFF */
    }



    a::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 0.2vmin;
        background-color: #172a5c;
        bottom: 0;
        left: 0;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease-in-out;
    }

    a.active::after{
        transform: scaleX(1);
    }




    a:hover::after{
        transform: scaleX(1);
    }


    
`;

export const NewTrade = styled.div`
    display: flex;
    align-items: center;
    font-size: 2vmin;
    /* color: white; */
    /* background-color: #5C51A6; */
    color:#172a5c;
    padding: 0.5vmin 1vmin;
    border-radius: 0.4rem;
    cursor: pointer;
    /* span{
        font-weight: 600;
    } */
`;

export const Icon = styled.div`
    width: 2.5vmin;
    height: 2.5vmin;
    mask: ${({image}) => `url(${image}) no-repeat center / contain`};
    background-color: #172a5c;
    -webkit-mask: ${({image}) => `url(${image}) no-repeat center / contain`};
    cursor: pointer;
`;