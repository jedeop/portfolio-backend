import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Logo from '@/components/logo'
import GlobalStyle from '@/styles/global'

const Home = loadable(() => import('@/pages/Home'))
const Post = loadable(() => import('@/pages/Post'))

const Container = styled.div`
  background-color: #F8F8F8;
  min-height: 100vh;
`

const Header = styled.header`
  padding: 5px 15px;
  background: linear-gradient(272deg, #61CDB7 0%, #24B799 100%);
  font-size: 25px;
  font-weight: bold;
  color: white;
`

const FlexLink = styled(Link)`
  display: flex;
  align-items: center;
`

const Title = styled.span`
  margin-left: 5px;
`

const App = () => (
  <Container>
    <GlobalStyle />
    <Helmet>
      <title>제덮 블로그</title>
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
    <Header>
      <FlexLink to="/">
        <Logo width={100} />
        <Title>블로그</Title>
      </FlexLink>
    </Header>
    <main>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/post/:postId">
          <Post />
        </Route>
      </Switch>
    </main>
    <footer>
    </footer>
  </Container>
)

export default App