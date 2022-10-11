import styled from "styled-components";

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-body {
    background: #fff;
    padding: 15px;
    display: flex;
    flex-direction: column;
    button {
      width: 50px;
      margin: 0 5px;
    }
    div {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
`;

export default ModalWrapper;
