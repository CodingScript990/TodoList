import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";

// check icon
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #457de3;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  /* state of color */
  ${(props) =>
    props.done &&
    css`
      background: #457de3;
      border: 1px solid #457de3;
      color: #ffffff;
    `}
`;
// Text
const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #4984ea;

  /* state of color */
  ${(props) =>
    props.done &&
    css`
      color: #c7d5eb;
      text-decoration: line-through;
    `}
`;

// remove icon
const Remove = styled.div`
  opacity: 0; // not show
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #3250bf;
  }
`;

// TodoItem parent
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    // mouse hover
    ${Remove} {
      // effect show remove
      opacity: 1;
    }
  }
`;

function TodoItem({ id, done, text }) {
  // {parameters}
  // dispatch state
  const dispatch = useTodoDispatch();
  // dispatch event onToggle
  const onToggle = () =>
    dispatch({
      type: "TOGGLE",
      id,
    });
  // dispatch event onRemove
  const onRemove = () =>
    dispatch({
      type: "REMOVE",
      id,
    });
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
