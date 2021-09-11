import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth,provider } from "../firebase";
function Login() {
    const signin=()=>{
        auth.signInWithPopup(provider).catch(alert);
    };
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>


            <LoginContainer>
                <Logo 
                    src="https://1000logos.net/wp-content/uploads/2021/04/WhatsApp-logo.png"
                />
                <Button onClick={signin} variant="outlined">Sign in with google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;

const Container=styled.div`
     display: grid;
     place-items: center;
     height: 100vh;
     background-image: url("https://dzbc.org/wp-content/uploads/data/2018/2/19/Background.max-x-PIC-MCH043354.jpg");
`;


const LoginContainer=styled.div`
     padding: 100px;
     display: flex;
     flex-direction: column;
     alifn-items: center;
     background-color: white;
     border-radius: 5px;
     box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`; 

const Logo = styled.img`
     height: 200px;
     width: 350px;
     margin-bottom: 50px;
`;

