import { createContext, useContext, useReducer } from "react";
import { calcListTotal, calcSalaireCompte } from "../utils/calc";

function updateSalaireCompte(state) {
  const budget = calcSalaireCompte(state.compteSalaire, state.compteCompte);
  state["budgetSalaireCompte"].value = budget;
  state.update.keys.push("budgetSalaireCompte");
  return state;
}

function updatebudgetSalaireCompteListMois(s) {
  const state = { ...s };
  const budget = calcListTotal(state.listMois, state.budgetSalaireCompte);
  state["budgetListMois"] = budget;
  return state;
}

function updateStateCalc(key, s) {
  let state = { ...s };
  if (key === "all") {
    state = updateSalaireCompte(state);
    state = updatebudgetSalaireCompteListMois(state);
    return state;
  }

  state.update.keys.push(key);
  state.update.shouldUpdate = true;

  if (
    (key === "compteSalaire" || key === "compteCompte") &&
    state["budgetSalaireCompte"].checked === false
  ) {
    state = updateSalaireCompte(state);
  } else if (key === "budgetSalaireCompte" || key === "listMois") {
    state = updatebudgetSalaireCompteListMois(state);
  }

  state.update.keys = [...new Set(state.update.keys)];
  return state;
}

const reducer = function (state, action) {
  switch (action.type) {
    case "init": {
      const n = {
        ...action.payload,
        update: { shouldUpdate: false, keys: [] },
      };
      return updateStateCalc("all", n);
    }
    case "replace": {
      const n = { ...state };
      n[action.payload.key] = action.payload.value;
      return updateStateCalc(action.payload.key, n);
    }
    case "addOne": {
      const n = { ...state };
      const lastId =
        n[action.payload.key][n[action.payload.key].length - 1]?.id ?? 0;

      const newObj = {
        ...action.payload.value,
        checked: false,
        id: lastId + 1,
      };

      n[action.payload.key] = [...n[action.payload.key], newObj];
      return updateStateCalc(action.payload.key, n);
    }
    case "updateOne": {
      console.log('update')
      const n = { ...state };
      n[action.payload.key].forEach((el, k) => {
        if (parseInt(el.id) === parseInt(action.payload.value.id)) {
          n[action.payload.key][k] = {
            ...n[action.payload.key][k],
            ...action.payload.value,
          };
        }
      });
      return updateStateCalc(action.payload.key, n);
    }
    case "removeOne": {
      const n = { ...state };
      const filtered = n[action.payload.key].filter((el) => {
        return parseInt(el.id) !== parseInt(action.payload.id);
      });
      n[action.payload.key] = filtered;
      return updateStateCalc(action.payload.key, n);
    }
    case "toggleCheck": {
      const n = { ...state };
      n[action.payload.key].forEach((el, k) => {
        if (parseInt(el.id) === parseInt(action.payload.id)) {
          n[action.payload.key][k].checked = action.payload.checked;
        }
      });
      return updateStateCalc(action.payload.key, n);
    }
    case "resetUpdate": {
      return { ...state, update: { shouldUpdate: false, keys: [] } };
    }
    default: {
      throw new Error("Action inconnue.");
    }
  }
};

export const DataContext = createContext(null);
export const DataDispatchContext = createContext(null);

export function DataContextProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, {
    update: { shouldUpdate: false },
  });

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}
