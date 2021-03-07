/**
 * 해당 컴포넌트는 드라이버 용도입니다.
 * 디자인 나오묜 삭제 예정
*/

import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Auth } from '../db'
const useQuery = () => new URLSearchParams(useLocation().search)
const TestComponent = (): ReactElement => {
  const queryString = useQuery()
  const history = useHistory()
  const [readOnly, setReadOnly] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')

  const handleChangeUsername = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setUsername(value)
  const handleChangeBio = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setBio(value)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReadOnly(true)
    const loginInfo = {
      email: queryString.get('email') as string,
      register_code: queryString.get('code') as string,
      username,
      bio,
    }
    console.log(loginInfo)
    try {
      const { status, data } = await Auth.register(loginInfo)
      if (status === 201) {
        alert('[DEBUG] 가입에 성공했습니다.')
        sessionStorage.setItem('token', data.accessToken)
      }
    } catch ({ response }) {
      if (response.status === 400) alert('[DEBUG] 올바르지 않은 정보입니다. 여기 닉네임 글자수 제한 이런 거 있어보임.')
      else if (response.status === 409) alert('[DEBUG] 존재하는 닉네임입니다.')
    }
    setReadOnly(false)
  }
  useEffect(() => {
    if (!queryString.get('code') || !queryString.get('email')) {
      alert('[DEBUG] 잘못된 접근입니다.')
      history.goBack()
    }
  }, [])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={username} onChange={handleChangeUsername} readOnly={readOnly} placeholder={'닉네임'} />
        <input type='text' value={bio} onChange={handleChangeBio} readOnly={readOnly} placeholder={'상태메세지'} />
        <input type='submit' value={'제출'} />
      </form>
    </div>
  )
}

export default TestComponent