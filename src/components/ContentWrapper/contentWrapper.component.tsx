import styled from "styled-components";

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;

  table {
    width: 100%;
    table-layout: fixed;

    thead {
      font-weight: bold;
      font-size: 14px;
    }

    td {
      padding: 5px;
      border: 1px solid #000;
      button {
        width: auto;
        font-size: 12px;
        margin: 0 5px;
      }

      &.actions {
        text-align: center;
        display: flex;
      }
    }
  }

  button {
    width: 100px;
    cursor: pointer;
  }
  label {
    min-width: 200px;
  }

  form {
    > div {
      display: flex;
      margin-bottom: 5px;
    }
    .error {
      margin-left: 5px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }
`;

export default ContentWrapper;
