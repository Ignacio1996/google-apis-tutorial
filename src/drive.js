const url = "https://www.googleapis.com/drive/v3/files";

export const getFiles = (token) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFilesByName = (token, filename) => {
  const customUrl = `https://www.googleapis.com/drive/v3/files?q=name='${filename}'`;
  return fetch(customUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
