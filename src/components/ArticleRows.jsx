import styled from "styled-components";
import useArticleRows from "../hooks/useArticleRows";
import { useState } from "react";

export default function ArticleRows({ dbKey }) {
  const { rows, addForm, handlePress, deleteAll } = useArticleRows(dbKey);

  const [ showModal, setShowModal ] = useState(false)

  const handleDeleteAll = (e) => {
    deleteAll(e)
    setShowModal(false)
  }

  return (
    <Wrapper>
      <Rows>{rows}</Rows>
      <Bottom>
        <Button onClick={handlePress}>+</Button>
        <Button onClick={() => setShowModal(true)}>-</Button>
      </Bottom>
      {addForm}
      {showModal && (
        <Modal>
          <p>Es-tu sûr de vouloir tout supprimer ?</p>
          <div>
            <button onClick={handleDeleteAll}>Oui</button>
            <button onClick={() => setShowModal(false)}>Non</button>
          </div>
        </Modal>
      )}
    </Wrapper>
  );
}

const Modal = styled.div`
  position: absolute;
  inset: 0;
  bottom: .5rem;
  background-color: black;
  border: 3px solid black;
  display: grid;
  place-content: center;
  gap: 2rem;
  border: 1px solid white;
  border-radius: .5rem;

  & > div {
    display: flex;
    gap: 3rem;

    & > button {
      flex: 1;
      padding: 0.5rem 1rem;
    }
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content;
  padding-bottom: 0.5rem;
  position: relative;
  gap: 1rem;
  overflow: hidden;
`;
const Rows = styled.div`
  display: grid;
  align-content: start;
  gap: 1rem;
  overflow-y: scroll;
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: inherit;
  padding-block: 0.5rem;
  border-radius: 0.5rem;
`;
