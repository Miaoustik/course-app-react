import { useState } from "react";
import ArticleRow from "../components/ArticleRow";
import { useData, useDataDispatch } from "../contexts/DataContext";
import ArticleAddForm from "../components/ArticleAddForm";

export default function useArticleRow(dbKey) {
  //Construit les lignes grace aux données
  const buildRows = (data) => {
    const n = [];
    data.forEach((el) => {
      n.push(
        <ArticleRow
          onCheck={(e) => handleCheck(e, el.id)}
          course={dbKey === "course"}
          onUpdate={(e) => handlePress(e, el.id)}
          el={el}
          key={el.id}
          onDelete={() => handleDelete(el.id)}
          setShow={setShow}
          show={show[el.id]}
        />
      );
    });
    return n;
  };

  const [addForm, setAddform] = useState(null);
  const dispatch = useDataDispatch();
  const data = useData();
  const [show, setShow] = useState({});

  //Modifie le checked d'une ligne grace a son id
  const handleCheck = (e, id) => {
    dispatch({
      type: "toggleCheck",
      payload: { key: dbKey, id, checked: e.target.checked },
    });
  };

  const deleteAll = () => {
    dispatch({
      type: "replace",
      payload: { key: dbKey, value: [] },
    });
  };

  const resetAddForm = () => {
    setTimeout(() => {
      setAddform(null);
    }, 700)
  }

  //Crée la nouvelle entrée en stock
  const handleAddOk = (name, price, quantity = null, id = null) => {
    if (!id) {
      const obj = {
        name,
        price: parseFloat(price),
        checked: false,
      };

      if (quantity) {
        obj.quantity = quantity;
      }

      dispatch({
        type: "addOne",
        payload: { key: dbKey, value: obj },
      });
    } else {
      const obj = data[dbKey].filter((el) => el.id === id)[0];

      const updated = {
        ...obj,
        name,
        price,
      };

      if (quantity) {
        updated.quantity = quantity;
      }

      dispatch({
        type: "updateOne",
        payload: { key: dbKey, value: updated },
      });
    }

    resetAddForm()    
  };

  //Supprime une ligne grace a son id
  const handleDelete = async (id) => {
    dispatch({
      type: "removeOne",
      payload: { key: dbKey, id },
    });
  };

  //Annule une création ou une modification
  const handleNo = () => {
    resetAddForm()
  };

  const handlePress = (e, id = null) => {
    const course = dbKey === "courseList";

    if (id === null) {
      setAddform(
        <ArticleAddForm
          course={course}
          handleOk={handleAddOk}
          handleNo={handleNo}
        />
      );
    } else {
      const el = data[dbKey].filter((el) => el.id === id)[0];

      setAddform(
        <ArticleAddForm
          course={course}
          handleOk={(name, price, quantity = null) =>
            handleAddOk(name, price, quantity, el.id)
          }
          handleNo={handleNo}
          defaultPrice={el.price}
          defaultName={el.name}
          defaultQuantity={el.quantity}
        />
      );
    }
  };

  //   A tester !

  //   const rows = useMemo(() => {
  //     return buildRows(data[dbKey])
  //   }, [data.update.shouldUpdate])

  return {
    rows: buildRows(data[dbKey]),
    addForm,
    handlePress,
    handleAddOk,
    handleNo,
    deleteAll,
  };
}
