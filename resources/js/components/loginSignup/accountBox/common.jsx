import styled from "styled-components";

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const Input = styled.input`
    width: auto;
    height: 42px;
    outline: none;
    border: 1px solid rgba(200, 200, 200, 0.3);
    padding: 0px 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: all 200ms ease-in-out;

    &::placeholder {
        color: rgba(7, 23, 84, 0.6);
    }

    &:focus {
        outline: none;
        border: 2px solid #071754;
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 11px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all 240ms ease-in-out;
    background: #071754;

    &:hover {
        background: #0a1f6e;
    }
`;

export const LineText = styled.p`
    font-size: 14px;
    //   color: rgba(7, 23, 84, 0.8);
    color: #c4c7e3;
    font-weight: 500;
`;

export const MutedLink = styled.a`
    font-size: 12px;
    color: rgba(7, 23, 84, 0.8);
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px dashed rgba(7, 23, 84, 0.8);
`;

export const BoldLink = styled.a`
    font-size: 14px;
    color: #ecc309;
    //   color: #C4C7E3;
    font-weight: 600;
    text-decoration: none;
    margin: 0 4px;
    border-bottom: 1px solid #ecc309;
`;
