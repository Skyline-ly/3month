export const getApi = async () => {
  const res = await fetch("/db.json");
  const data = await res.json();
  return data.products || [];
};