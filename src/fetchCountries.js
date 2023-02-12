function fetchData(query) {
  const URL = `https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,flags,languages`;

  return fetch(URL).then(response => {
    // console.log(response);
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export default fetchData;
