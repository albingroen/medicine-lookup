export const medicineTypeToTitle: { [key: string]: string } = {
  product: "Produkt",
  atc: "ATC kod",
};

const apiUrl = "https://basikit-demo-server.herokuapp.com";

export const getMedicines = async (search: string) => {
  return fetch(`${apiUrl}/medicine?search=${search}`).then((res) => res.json());
};

export const getMedicine = async (id: string) => {
  return fetch(`${apiUrl}/medicine/${id}`).then((res) => res.json());
};
