import { css } from "styled-components";

export enum breakPoints {
  sm = "576px",
  md = "768px",
  lg = "992px",
}

export const secondTitleStyle = css`
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
`;

export const borderedBoxStyle = css`
  background: #ffffff;
  border: 5px solid #27569c;
  box-shadow: 0px 4px 4px #00000040;
  border-radius: 6px;
`;
