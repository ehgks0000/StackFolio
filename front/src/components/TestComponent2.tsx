/**
 * 해당 컴포넌트는 드라이버 용도입니다.
 * 디자인 나오묜 삭제 예정
*/

import React, { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userState } from 'atoms/user'
import { Auth } from '../db'

const useQuery = () => new URLSearchParams(useLocation().search)
const TestComponent = (): ReactElement => {
  const queryString = useQuery()
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    (async () => {
      const code: string | undefined | null = queryString.get('code')
      if (!code) {
        alert('[DEBUG] 잘못된 접근입니다.')
      } else {
        try {
          const { status, data } = await Auth.google.verify(code)
          if (status === 200) {
            const {
              accessToken,
              profile: [{
                username,
                bio,
                avatar,
                user_id,
                social_links: {
                  email,
                },
              }],
            } = data
            sessionStorage.setItem('token', accessToken)
            const user = {
              user_id,
              username,
              bio,
              avatar,
              email
            }
            setUser(user)
          }
        } catch ({ response }) {
          if (response.status === 400) alert('[DEBUG] 올바르지 않은 코드입니다.')
        }
      }
    })()
  }, [])
  return <></>
}

export default TestComponent
