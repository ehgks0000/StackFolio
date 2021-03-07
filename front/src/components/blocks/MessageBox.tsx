/**
 * 회원가입, 로그인 메시지 박스
 */
//이메일 주소 오류 시 메세지
import styled, { keyframes } from 'styled-components'
interface sizePropsType {
  size: number
}
const fadeIn = keyframes`
  from { 
    color: rgba(33, 33, 33, 0);
    height: 0px;
    opacity: 0; 
  }
  to { 
    color: rgba(33, 33, 33, 200);
    height: 35px;
    opacity: 0.65;
  }
`
const EmailMessage = styled.div<sizePropsType>`
  position: relative;
  display: flex;
  align-items: center;
  color: #333;
  opacity: 0.65;
  box-shadow: 1px 1px 2px grey;
  margin-top:3px;
  white-space: nowrap;
  padding: 0 10px;
  font-size: 14px;
  width: ${props => props.size * 10 + 5}px;
  animation: ${fadeIn} 0.5s;
  height: 35px;
`
export const EmailErrorMessage = styled(EmailMessage)`
  background-color: #F39797;
`
export const EmailVerifyMessage = styled(EmailMessage)`
  background-color: #FFD3A5;
`