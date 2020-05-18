export const createSheet = (token, title) => {
  return fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      properties: {
        title: title,
      },
    }),
  });
};

export const updateSheetCell =()=>{
  return fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    
  })
}