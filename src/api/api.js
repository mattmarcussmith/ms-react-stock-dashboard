const basePath = "https://finnhub.io/api/v1";

export const searchSymbols = async (query) => {
  const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error occurred " + response.status);
  }
  return await response.json();
};
export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error("Error occurred " + response.status);
  }
    return await response.json();
};

export const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`
    const response = await fetch(url);
 
    if(!response.ok) {
        throw new Error("Error occurred " + response.status);
      }
    return await response.json();
}
export const fetchEarnings = async (stockSymbol) => {
  const url = `${basePath}/stock/earnings?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`
  const response = await fetch(url);
console.log(response);
  
  if(!response.ok) {
      throw new Error("Error occurred " + response.status);
    }
  return await response.json();
}