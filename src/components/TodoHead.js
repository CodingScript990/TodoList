import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";

// Template in Todo Header
const TodoHeadBlock = styled.div`
  padding: 32px;
  border-bottom: 1px solid #e9ecef;

  h1 {
    margin: 0 auto;
    font-size: 36px;
    font-family: "Helvetica Neue";
    text-align: center;
    background: linear-gradient(
      to bottom,
      #cfdffb,
      #aac5f5,
      #8eb2f2,
      #769fe9,
      #638fde,
      #5e87cf,
      #4a77c6
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .day {
    margin-top: 20px;
    font-size: 21px;
    font-family: "Helvetica Neue";
    text-align: right;
    color: #7ca3ea;
  }

  .tasks-left {
    color: #5e8ad9;
    font-size: 18px;
    font-weight: 600;
    font-family: "Helvetica Neue";
    margin-top: 20px;
    font-weight: boldD;
  }
`;

function TodoHead({ children }) {
  // todo state
  const todos = useTodoState();
  // todo isn't finish for remaining number
  const undoneTasks = todos.filter((todo) => !todo.done);
  // today Data
  const today = new Date();
  // date type change string and date time in korean
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // month
  const dayName = today.toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
