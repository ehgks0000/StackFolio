import { toggleSignInModalState } from "atoms/signInModal";
import { toggleThemeState } from "atoms/theme";
import { userState } from "atoms/user";
import { Box } from "components/material/Box";
import { Button } from "components/material/Button";
import { Switch } from "components/material/Switch";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SignIn from "./SignIn";
import LOGO_WHITE from 'assets/logo_white.png';

const Head = styled.header`
    background-color:#27384B;
    height: 55px;
    padding: 5px 20px 5px 20px;
    color: ${({theme}) => theme.default.text};
    display: grid;
    grid-template-columns : 180px calc(100% - 370px) 170px;
`
const Logo = styled.button`
    background: url(${LOGO_WHITE}) no-repeat center;
    background-size: contain;
    border: none;
    outline: none;
`

const Buttons = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
`

const Header = () => {
    const [user, setUser] = useRecoilState(userState);
    const [theme, toggleTheme] = useRecoilState(toggleThemeState);
    const [display, toggleDisplay] = useRecoilState(toggleSignInModalState);
    const history = useHistory();
    /**
     * 새로고침 로그아웃 방지
     * 로그인 후 페이지 이동
     */
    useEffect(() => {
        console.log(1)
        if (sessionStorage.getItem('token')) {
            // TODO: 로그인 상태
            history.push('/')
            if (!user?.user_id) {
                //TODO: getUser같은 api필요
                setUser({ ...user, user_id: '.' })
            }
        } else {
            // TODO: 로그아웃 상태
        }
    }, [user])
    return (
        <Head>
            <Logo onClick={()=>history.push('/')}/>
            <Box transparent>
                <Switch size="md" checked={theme==='light'} onChange={()=>toggleTheme('')} />
            </Box>
            <Buttons>
                <Button color="text" onClick={()=>history.push('/search')}>검색</Button>
                {
                    user.user_id ?
                    <>
                    <Button color="text">글쓰기</Button>
                    <Button color="text">알림</Button>
                    <Button color="text">프로필</Button>
                    </>
                    :
                    <>
                        <Button color="text" onClick={()=>toggleDisplay('')}> 로그인</Button>
                        <SignIn />
                    </>
                }
            </Buttons>
        </Head>
    )
}
export default Header;