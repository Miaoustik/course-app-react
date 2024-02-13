import { useState } from "react";
import styled, { keyframes } from "styled-components";

export default function ArticleAddForm({
  handleNo,
  handleOk,
  course = false,
  defaultName = "",
  defaultPrice = "",
  defaultQuantity = "",
}) {
  const [name, setName] = useState(defaultName);
  const [price, setPrice] = useState(defaultPrice);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [fadeOut, setFadeOut] = useState(false);

  const ok = () => {
    handleOk(name, price, quantity === "" ? null : quantity);
    setFadeOut(true);
  };

  const no = (e) => {
    handleNo(e);
    setFadeOut(true);
  };

  return (
    <Wrapper $fadeOut={fadeOut}>
      <label>Nom :</label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Prix :</label>
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
      />
      {course && (
        <>
          <label>Quantité :</label>
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />
        </>
      )}

      <ButtonGroup>
        <ButtonOk onClick={ok}>ok</ButtonOk>
        <ButtonNo onClick={no}>annuler</ButtonNo>
      </ButtonGroup>
    </Wrapper>
  );
}

const fadeIn = keyframes`
	from {
		transform: translateY(100%);
	}

	to {
		transform: translateY(0);
	}
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0.5rem;
  display: grid;
  width: 100%;
  background-color: black;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 0.5rem;
  transform: translateY(${(props) => (props.$fadeOut ? "100%" : "0")});
  animation: ${fadeIn} 0.7s ease-out;
  transition: transform 0.7s ease-out;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid white;
  border-radius: 0.5rem;
  background-color: transparent;
  font-size: 1.2rem;
  color: inherit;
  padding: 0.5rem 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding-block: 0.5rem;
  border: none;
  border-radius: 0.5rem;
`;

const ButtonOk = styled(Button)`
  background-color: lightgreen;
`;
const ButtonNo = styled(Button)`
  background-color: lightcoral;
`;
