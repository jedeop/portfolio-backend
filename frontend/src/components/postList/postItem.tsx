import React, { ReactElement } from "react";
import { PostForList } from "@/types/post";
import { parseISO, formatDistanceToNow } from "date-fns";
import koLocale from "date-fns/locale/ko";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Clock, Calendar, Lock } from "react-feather";
import Tags from "./tags";

const Main = styled.div`
  margin-bottom: 60px;
  line-height: 1.2;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`;
const Hr = styled.div`
  margin: 5px 0px;
  border-top: 1px solid var(--bg2-color);
`;
const Summary = styled.div`
  font-size: 18px;
  color: var(--fg1-color);
`;
const Meta = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-top: 5px;
  color: var(--fg2-color);
  display: flex;
  flex-wrap: wrap;
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const styledIcon = css`
  margin: 0px 3px;
`;
const StyledClock = styled(Clock)`
  ${styledIcon}
`;
const StyledCalendar = styled(Calendar)`
  ${styledIcon}
`;
const StyledLock = styled(Lock)`
  ${styledIcon}
`;

interface PostItemProps {
  post: PostForList
}
export default function PostItem({ post }: PostItemProps): ReactElement {
  const { title, summary, readTime, createdAt, tags, isPublished, postId } = post;

  return (
    <Main>
      <Link to={`/post/${postId}`} >
        <Title>
          {
            isPublished
              ? null
              : <StyledLock size={20} />
          }
          {title}
        </Title>
        <Hr />
        <Summary>{summary}</Summary>
        <Meta>
          <Tags tags={tags || []} />
          <RightSide>
            <StyledCalendar size={16} />
            {formatDistanceToNow(parseISO(createdAt), { locale: koLocale })} 전 ⋮ 
            <StyledClock size={16} />{readTime}분
          </RightSide>
        </Meta>
      </Link>
    </Main>
  );
}