import styled from "styled-components";
import priceFormater from "../utils/priceFormater";

export default function ArticleRow({
  el,
  onDelete,
  onUpdate,
  onCheck,
  show,
  setShow,
  course = false,
}) {
  const totalPrice = parseFloat(el.price) * parseInt(el.quantity);

  const handleOptions = () => {
    setShow(s => {
      const n = {...s}
      for (let key in n) {
        n[key] = false
      }
      n[el.id] = true
      return n
    })
  }

  const handleUpdate = (e) => {
    onUpdate(e)
    setShow(s => ({...s, [el.id]: false}))
  }

  return (
    <Wrapper>
      <input
        type="checkbox"
        checked={el.checked}
        aria-label="acheté"
        onChange={onCheck}
        onClick={(e) => e.stopPropagation()}
      />
      <span onClick={onUpdate}>{el.name}</span>

      {course === true ? (
        <>
          <span>{el.quantity ?? 0}</span>
          <div>
            <span>{el.price}</span>
            <span>{priceFormater(totalPrice)}</span>
          </div>
        </>
      ) : (
        <span>{el.price}</span>
      )}
      <button onClick={handleOptions}>X</button>
      <Choices $show={show}>
        <button onClick={handleUpdate}>Modifier</button>
        <button onClick={onDelete}>Supprimer</button>
        <button onClick={() => setShow(false)}>Annuler</button>
      </Choices>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
`;

const Choices = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  border-radius: 0.5rem;
  transform: translateX(${(props) => props.$show ? '0' : '100%'});
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: transform .7s ease-out;

  & > button {
    padding: .75rem;
    color: white;
    background-color: transparent;
    border: 1px solid white;
    border-radius: .5rem;
  }
`
