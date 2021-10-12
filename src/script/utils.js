export async function fetchData(route) {
  try{
    const resp = await axios.get(`http://localhost:5000/${route}`);
    const data = resp.data;
    return data;
  }
  catch(e){
    console.log(err);
    return [];
  }
}

export const createElementHelper = (type, classList, innerText, innerHTML) => {
  const customElement = document.createElement(type);
  if (classList) customElement.classList = classList;
  if (innerText) customElement.innerText = innerText;
  if (innerHTML) customElement.innerHTML = innerHTML;

  return customElement;
};