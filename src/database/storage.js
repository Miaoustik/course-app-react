export function get(dbKey) {
  const dataJson = localStorage.getItem(dbKey);
  return JSON.parse(dataJson);
}

export function save(dbKey, data) {
  return localStorage.setItem(dbKey, JSON.stringify(data));
}

export async function getAll() {
  const data = {};

  //pass dbKey with default value
  const keys = [
    ["compteSalaire", 0],
    ["compteCompte", []],
    [
      "budgetSalaireCompte",
      {
        value: 0,
        checked: false,
      },
    ],
    ["listMois", []],
    ["courseList", []],
  ];

  for (let key of keys) {
    const k = key[0];
    data[k] = (await get(k)) ?? key[1];
  }
  return data;
}
