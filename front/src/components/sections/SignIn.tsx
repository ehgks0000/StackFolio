import { toggleSignInModalState } from 'atoms/signInModal';
import { Box } from 'components/material/Box';
import Text, { Subtitle } from 'components/material/Text';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { IoLogoFacebook, IoLogoGithub } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import Separator from 'components/material/Separator';
import { TextField } from 'components/material/Textfield';
import { Button } from 'components/material/Button';
import ModalBackgroundImg from 'assets/modal_bg.png';
import media from 'styles/media';
import TextButton from 'components/material/TextButton';
import { Auth } from '../../db'

const ModalBackground = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background: url(${ModalBackgroundImg}) no-repeat center center;
    background-size: cover;
`;
const Modal = styled.div`
    position: absolute;
    top: 15%;
    right: 100px;
    ${media.tablet`
        position: initial;
        margin: 20% auto;
    `}
    background-color: #fefefe;
    padding: 20px 30px;
    border: 1px solid #888;
    width: min(400px, calc(90% - 60px)); 
    box-shadow: 1px 1px 6px black;
`
const ModalHeader = styled(Box)`
    height: 100px;
`;
const EmailWrapper = styled.div `
    padding: 50px 0 30px 0;
`;
const EmailField = styled.div`
    & > *{
        width: 100%;
    }
    & > button{
        position: relative;
        margin: 0;
        float: right;
        top: -40px;
        height: 35px;
        width: 6rem;
    }
`
interface sizePropsType {
    size: number 
}
const fadeOut = keyframes`
    0% {
        opacity: .65; 
    }
    67% {
        opacity: .65;
    }
    100% {
        opacity: 0;
    }
`
const EmailMessage = styled.div<sizePropsType>`
    width: ${props => props.size * 10 + 5}px;
    position: relative;
    display: flex;
    align-items: center;
    color: #333;
    opacity: 0.65;
    box-shadow: 1px 1px 2px grey;
    margin-top: 3px;
    white-space: nowrap;
    padding: 0 10px;
    font-size: 14px;
    height: 35px;
    animation: ${fadeOut} 1.5s forwards;
`
const EmailErrorMessage = styled(EmailMessage)`
    background-color: #F39797;
`
const EmailVerifyMessage = styled(EmailMessage)`
    background-color: #FFD3A5;
`

const SocialButtonWrapper = styled.div`
    padding: 50px 0;
    & > button:nth-child(n+2){
        margin-top: 20px;
    }
`
const SocialButton = styled.button`
    padding: 0;
    width: 100%;
    height: 60px;
    border-radius: 30px;
    border: black solid 1px;
    background: none;
    display: grid;
    grid-template-columns: 35% auto;
    font-size: 24px;
    outline: none;
    & > div { 
        height: 100%; 
        padding: 0 10px;
    }
`

//이메일 주소 유효성 검사
const checkIsValidEmail = (address:string) => {
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return emailRegex.test(String(address).toLowerCase());
}

const SignIn = () => {
    const [readOnly, setReadOnly] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    //const [timer, setTimer] = useState<NodeJS.Timeout>(setTimeout(()=>{}, 1))
    let timer: NodeJS.Timeout = setTimeout(() => {}, 0)
    // modal 바깥 부분 클릭 시 숨기기
    const [display, toggleDisplay] = useRecoilState(toggleSignInModalState);
    const ref = useRef(null);
    const toggle = (event:any) => 
        (event.target === ref.current) && toggleDisplay('');

    // sign in - sign up mode
    const [isSignInMode, setIsSignInMode] = useState<Boolean>(true);
    const toggleIsSignInMode = () => setIsSignInMode(prev => !prev);

    // Show message 
    const [showErrorMessage, setShowErrorMessage] = useState<Boolean>(false);
    const [showVerifyMessage, setShowVerifyMessage] = useState<Boolean>(false)

    const [email, setEmail] = useState('');
    const onEmailChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(value);
    }
    const resetMessage = () => {
        clearTimeout(timer)
        setMessage('')
        setShowVerifyMessage(false)
        setShowErrorMessage(false)
    }
    const displayMessage = (callback: (_: boolean) => void, msg: string) => {
        resetMessage()
        callback(true)
        setMessage(msg)
        timer = setTimeout(() => {
            resetMessage()
        }, 1550)
    }
    // 로그인 버튼 클릭 시
    const onSignInClicked = async () => {
        const isValid = checkIsValidEmail(email);
        if (!isValid) displayMessage(setShowErrorMessage, '올바르지 않은 메일 형식입니다.')
        else {
            try {
                const { status } = await Auth.google.signIn(email)
                if (status === 201) displayMessage(setShowVerifyMessage, '로그인 링크가 이메일로 전송되었습니다.')
            } catch ({ response }) {
                if (response.status === 400) displayMessage(setShowErrorMessage, '등록되지 않은 이메일입니다.')
                else if (response.status === 500) displayMessage(setShowErrorMessage, '서버와 연결할 수 없습니다.')
            }
        }
    }

    // 회원가입 버튼 클릭 시
    const onSignUpClicked = async () => {
        setReadOnly(true)
        const isValid = checkIsValidEmail(email)
        if (!isValid) displayMessage(setShowErrorMessage, '올바르지 않은 메일 형식입니다.')
        else {
            // TODO: alert -> UI
            try {
                const { status } = await Auth.google.register(email)
                if (status === 201) displayMessage(setShowVerifyMessage, '회원가입 링크가 이메일로 전송되었습니다.')
                setEmail('')
            } catch ({ response }) {
                if (response.status === 400) displayMessage(setShowErrorMessage, '이미 가입되었거나 존재하지 않는 이메일입니다.')
                else displayMessage(setShowErrorMessage, '서버와 연결할 수 없습니다.')
            }
        }
        setReadOnly(false)
    }
    
    return (
        <ModalBackground ref={ref} style={{display}} onClick={toggle}>
            <Modal>
                <ModalHeader transparent>
                    <Text fontSize={48} color="#666">{isSignInMode ? "LOGIN" : "SIGN UP"}</Text>
                </ModalHeader>
                <EmailWrapper>
                    <Subtitle color="#999">이메일로 {isSignInMode ? "로그인" : "회원가입"}</Subtitle>
                    <EmailField>
                        <TextField 
                            height={36}
                            value={email}
                            onChange={onEmailChange}
                            fullWidth
                            readOnly={readOnly}
                            placeholder="이메일 주소를 입력하세요." 
                        />
                         <Button
                            color={email ? "primary": "secondary"}
                            disabled={!Boolean(email)}
                            onClick={isSignInMode ? onSignInClicked : onSignUpClicked}
                            >
                            {isSignInMode ? "로그인" : "회원가입"}
                        </Button>
                        {showErrorMessage && 
                            <EmailErrorMessage size={message.length}>
                                <span>{message}</span>
                            </EmailErrorMessage>
                        }
                        {showVerifyMessage &&
                            <EmailVerifyMessage size={message.length}>
                                <span>{message}</span>
                            </EmailVerifyMessage>
                        }
                        <Text right>
                            {isSignInMode ? "신규 사용자이신가요?" : "계정이 이미 있으신가요?"} &nbsp;
                            <TextButton onClick={toggleIsSignInMode}>
                                {isSignInMode ? "회원가입" : "로그인"}
                            </TextButton>하기
                        </Text>
                    </EmailField>
                </EmailWrapper>
                <Separator> 또는 </Separator>
                <SocialButtonWrapper>
                <SocialButton>
                    <Box transparent right>
                        <FcGoogle size={32}/> 
                    </Box>
                    <Box transparent left>
                        Google로 계속
                    </Box>
                </SocialButton>
                <SocialButton>
                    <Box transparent right>
                        <IoLogoFacebook color="#3b5998" size={32}/>
                    </Box>
                    <Box transparent left>
                        Facebook으로 계속
                    </Box>
                </SocialButton>
                <SocialButton>
                    <Box transparent right>
                        <IoLogoGithub color="#111" size={32}/>
                    </Box>
                    <Box transparent left>
                        Github로 계속
                    </Box>
                </SocialButton>
                </SocialButtonWrapper>
            </Modal>
        </ModalBackground>
    )
}

export default SignIn;