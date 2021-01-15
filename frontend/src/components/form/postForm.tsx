import React, { ReactElement } from "react";
import Switch from "@/components/switch";
import styled from "styled-components";
import BaseContainer from "@/styles/container";
import PostContents from "../post/postContents";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import BaseTextArea from "./BaseTextArea";

const Container = styled.div`
  ${BaseContainer}
  margin-top: 10px;
  
  > form > * {
    margin: 10px 0px;
  }
  
  input, textarea {
    width: 100%;
    font-size: 16px;
    display: block;
  }
`;
const ContentsTextArea = styled(BaseTextArea)`
  resize: vertical;
`;

interface PostFormProps {
  title: [string, (value:string) => void],
  summary: [string, (value:string) => void],
  contents: [string, (value:string) => void],
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

export default function PostForm({ title: [title, setTitle], summary: [summary, setSummary], contents: [contents, setContents], onSubmit }: PostFormProps): ReactElement {
  return (
    <Container>
      <form method="post"
        onSubmit={onSubmit}
      >
        <BaseInput type="text" placeholder="제목을 입력하세요" maxLength={50} value={title} onChange={setTitle} />
        <BaseInput type="text" placeholder="개요를 입력하세요" maxLength={100} value={summary} onChange={setSummary} />
        <Switch 
          items={[
            {
              name: "작성하기",
              children: <ContentsTextArea value={contents} onChange={setContents} placeholder="본문 내용을 입력하세요" rows={20} />
            },
            {
              name: "미리보기",
              children: contents? <PostContents contents={contents} /> : <em>내용이 없습니다.</em>
            }
          ]} 
        />
        <BaseButton type="submit" value="저장하기" onClick={() => null} />
      </form>
    </Container>
  );
}