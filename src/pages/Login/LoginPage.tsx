import logoImg from 'assets/images/logo.png'
import { CommonHeader } from 'components/CommonHeader'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  ContentInput,
  InputContainer,
  JoinButton,
  JoinContainer,
  JoinInfoTypo,
  LoginButton,
  LogoImg,
  LogoTypo,
  Root,
} from './styled'
import { UserLoginResponseType, userLogin } from 'api/userLogin'

type LoginPageProps = {
  className?: string
}

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onClickJoinButton = () => {
    navigate('/join')
  }

  const onLoginAPI = () => {
    if(id.length === 0 || password.length === 0) {
      return // alert 넣고 싶다..
    } 
    const data = {
      id: id,
      pw: password
    }
    userLogin('/user/login', data)
    .then((response: UserLoginResponseType) => {
      if (response.status === 'SUCCESS') {
        console.log('SUCCESS');
        navigate('/')
        // eslint-disable-next-line no-undef
        localStorage.removeItem('test_login')
        // eslint-disable-next-line no-undef
        localStorage.setItem('test_login', 'true')
      } else {
        console.log('FAIL');
        console.log('Error message:', response.message);
      }
    })
    .catch((error: any) => {
      console.error('Error :', error);
    });
    //console.log(userLogin('user/login', data))
  }

  const onKeyPressEnter = (e: any) => {
    if (e.key === 'Enter') {
      onLoginAPI()
      navigate('/')
    }
  }

  const onClickLogin = () => {
    onLoginAPI()
  }

  return (
    <Root className={className}>
      <CommonHeader />
      <Container>
        <LogoImg src={logoImg} alt={'로고 이미지'} />
        <LogoTypo>당신의 능력, 티밍에서 펼쳐보세요!</LogoTypo>
        <InputContainer>
          <ContentInput placeholder="아이디" onChange={(e) => setId(e.target.value)}/>
          <ContentInput placeholder="비밀번호" type="password" onKeyDown={onKeyPressEnter} onChange={(e) => setPassword(e.target.value)}/>
        </InputContainer>
        <LoginButton type="primary" onClick={onClickLogin}>
          로그인
        </LoginButton>
        <JoinContainer>
          <JoinInfoTypo>아직 회원이 아니세요?</JoinInfoTypo>
          <JoinButton type="text" onClick={onClickJoinButton}>
            회원가입
          </JoinButton>
        </JoinContainer>
      </Container>
    </Root>
  )
}

