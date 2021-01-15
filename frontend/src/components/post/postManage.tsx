import React from 'react'
import { Edit3, Trash2 } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  > a {
    margin-left: 10px;
    color: hsl(0, 0%, 60%);
    transition: color .3s;
    :hover {
      color: black;
    }
  }
  justify-content: flex-end;
`

interface PostManageProps {
  postId: string,
}
export default function PostManage({ postId }: PostManageProps) {
  return (
    <Container>
      <Link to={`/write/${postId}`}>
        <Edit3 size={20} />
      </Link>
      <Link to={`/delete/${postId}`}>
        <Trash2 size={20} />
      </Link>
    </Container>
  )
}