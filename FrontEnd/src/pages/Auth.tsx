import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Mountain from "@/assets/mountain.jpg"

const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;
    background-image: url(${Mountain});
    background-size: cover; 
    overflow: hidden;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Auth = () => {
    return (
        <>
            <StyledMain>
                <Outlet />
            </StyledMain>
        </>
    );
};

export default Auth;
