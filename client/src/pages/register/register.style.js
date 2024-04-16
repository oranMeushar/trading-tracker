import styled from '@emotion/styled';


export const LoginContainer = styled.div`
    min-height:100vh;
    display: grid;
    place-items: center;
`;
export const Form = styled.div`
    border-top:0.6rem solid #2EB475;
    background-color: white;
    padding:3vmin 3vmin;
    border-radius: 0.6rem;
    display: flex;
    flex-direction: column;
`;


export const LogoContainer = styled.div`
    display:flex;
    align-items:center;
    gap:1vmin;
    width: fit-content;
    align-self: center;
    margin-bottom:2vmin;
`;

export const LogoText= styled.div`
    font-size: clamp(20px, 5vmin, 40px);
    color: #2cb1bc;
    letter-spacing:0.1vmin;
`;


export const FormTitle = styled.div`
    font-size: 4.5vmin;
    align-self: center;  
    margin-bottom: 2vmin;
`;

export const Input = styled.input`
    /* font-size: ${({isError}) => isError ? '2vmin' :'3vmin'}; */
    font-size: 3vmin;
    margin-bottom: 3vmin;
    letter-spacing: 0.2rem;
    outline:none;
    border: ${({isError}) => isError && '1px solid red'};
    background-color: ${({isError}) => isError && '#FC7A7A'};
    :focus{
        border: ${({isError}) => !isError ? '1px solid #2cb1bc' : '1px solid red'};
    }
    :focus::placeholder{
      opacity: 0;
    }
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 3vmin;
    & > p{
        margin-bottom:1.2vmin;
    }
    >input#password, >input#passwordConfirm{
        font-size: ${({isError}) => isError ? '2vmin' :'3vmin'};
    }
`;

export const Button= styled.button`
    background: #2EB475;
    outline:none;
    cursor: pointer;
    border:none;
    padding:1vmin 0.5vmin;
    font-size: 3vmin;
    color:white;
    border-radius: 0.6rem;

    transition: all 0.3s linear;
    :hover{
        transform: scale(1.04);
        box-shadow: 0.3rem 0.3rem 1.5rem rgba(0, 0, 0, 0.5);
    }
`;

export const FormFooter = styled.div`
    font-size: 2vmin;
    align-self: center;
    margin-top:2vmin;
    & span{
        color: #2EB475;
        cursor: pointer;

    }
    
`;
