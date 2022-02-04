import React from "react";
import styled from "styled-components";

// Template style
const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  background: #fefefe;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 60px;

  display: flex;
  flex-direction: column;
`;

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
