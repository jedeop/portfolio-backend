import React, { useEffect, useRef } from 'react'
import { PostForList } from '@/types/post'
import PostItem from '@/components/postList/postItem'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import BaseContainer from '@/styles/container'

const GET_POSTS = gql`
query GetPosts ($cursor: String) {
  posts(first: 10, after: $cursor) {
    edges {
      node {
        id
        title
        intro
        created
        readTime
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`
interface GetPostsData {
  posts: {
    edges: [{
      node: PostForList,
      cursor: string,
    }],
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string,
    }
  }
}
interface GetPostsVar {
  cursor?: string,
}

const Container = styled.div`
  ${BaseContainer}
  padding-bottom: 30px;
`

export default function PostList() {
  const { loading, error, data, fetchMore } = useQuery<GetPostsData, GetPostsVar>(GET_POSTS)

  const pageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loading && data?.posts.pageInfo.hasNextPage) {
          console.log("Page End")
          fetchMore({
            variables: {
              cursor: data?.posts.pageInfo.endCursor,
            }
          })
        }
      })
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    })

    if (!pageEndRef.current) return
    observer.observe(pageEndRef.current)

    return () => {
      if (!pageEndRef.current) return
      observer.unobserve(pageEndRef.current)
    }
  })

  if (loading) return <div>로딩 중</div>
  if (error || !data) return <div>에러 발생: {error}</div>

  const list: JSX.Element[] = data.posts.edges
    .map(({ node }) => <PostItem key={node.id} post={node} />)
  return (
    <Container>
      {list}
      <div ref={pageEndRef}></div>
    </Container>
  )
}