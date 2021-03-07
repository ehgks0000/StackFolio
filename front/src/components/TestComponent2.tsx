/**
 * 해당 컴포넌트는 드라이버 용도입니다.
 * 디자인 나오묜 삭제 예정
*/

import React, { ReactElement, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Auth } from '../db'

const useQuery = () => new URLSearchParams(useLocation().search)
const TestComponent = (): ReactElement => {
  const queryString = useQuery()
  const history = useHistory()

  useEffect(() => {
    (async () => {
      const code: string | undefined | null = queryString.get('code')
      if (!code) {
        alert('[DEBUG] 잘못된 접근입니다.')
        history.goBack()
      } else {
        try {
          const { status, data } = await Auth.google.verify(code)
          if (status === 200) {
            console.log(data)
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
