import Lottie from "lottie-react";
import loginAnimation from "../../assets/animationJSON/loginAnimation.json";

import styled from "styled-components";
import AccountBox from "../components/loginSignup/accountBox/index";

const AppContainer = styled.div`
    // width: 100%;
    // height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 3rem;
`;

const AnimationContainer = styled.div`
    width: 500px;
    height: 500px;
`;

export default function App() {
    return (
        <AppContainer>
            <AnimationContainer>
                <Lottie animationData={loginAnimation} loop={true} />
            </AnimationContainer>
            <AccountBox />
        </AppContainer>
    );
}
