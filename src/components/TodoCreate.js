import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "../TodoContext";

// Circle button
const CircleButton = styled.button`
  background: #5a75dc;

  &:hover {
    background: #6986f5;
  }
  &:active {
    background: #3250bf;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);

  font-size: 60px;
  color: #ffffff;
  border-radius: 50%;

  border: none;
  outline: none;

  transition: all 0.125s ease-in;

  /* Open Event css style */
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

// Insert Form [position style(포지션)]
const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

// Insert Form [property style(속성)]
const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

// Input [property style]
const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  // [Todo State]
  // Write
  const [open, setOpen] = useState(false);
  // Input state value
  const [value, setValue] = useState("");
  // todo state[dispatch]
  const dispatch = useTodoDispatch();
  // todo state[nextId]
  const nextId = useTodoNextId();

  // [Todo Function Event]
  // Toggle
  const onToggle = () => setOpen(!open);
  // Change event
  const onChange = (e) => setValue(e.target.value);
  // onSubmit event(This is to prevent refresh)
  const onSubmit = (e) => {
    e.preventDefault();
    // create action
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue(""); // Empty value
    setOpen(false); // boolean value
    nextId.current += 1; // increase nextId
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              placeholder="할 일을 입력 후, Enter를 누르세요"
              autoFocus
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);
