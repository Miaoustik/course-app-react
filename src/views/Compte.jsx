import styled from "styled-components";
import ArticleRows from "../components/ArticleRows";
import { useData, useDataDispatch } from "../contexts/DataContext";
import {useState} from 'react'

export default function Compte () {
  const dispatch = useDataDispatch();
  const { compteSalaire } = useData();

  const [salaireInput, setSalaireInput] = useState(compteSalaire);

  const handleSubmitCompteSalaire = (e) => {
    e.preventDefault()
    dispatch({
      type: "replace",
      payload: {
        key: "compteSalaire",
        value: parseFloat(salaireInput),
      },
    });
  };

  return (
    <Wrapper>
      <Header className="header">
        <span>Salaire :</span>
        <form onSubmit={handleSubmitCompteSalaire}>
          <Input value={salaireInput} onChange={(e) => setSalaireInput(e.target.value)} type="number" />
        </form>
        <span> €</span>
      </Header>
      <ArticleRows dbKey={'compteCompte'} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  gap: 1rem;
`
const Input = styled.input`
  min-width: 0;
  flex: 1;
  background-color: transparent;
  border: 1px solid white;
  border-radius: .5rem;
  padding: .2rem;
  color: inherit;
`