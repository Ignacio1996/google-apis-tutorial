import React, { useState } from "react";
import { LoginWithGoogle } from "./auth";
import { getFiles, getFilesByName } from "./drive";
import { createSheet, updateSheetValue } from "./sheets";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [sheetId, setSheetId] = useState(null);

  const login = async () => {
    return LoginWithGoogle()
      .then((result) => {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        setUser(user);
        setToken(token);
        console.log("App.js | logged in! got user and token", user, token);
      })
      .catch((error) => {
        console.log("App.js | ", "Error with Login", error);
      });
  };

  const getDriveFiles = async () => {
    return getFiles(token)
      .then((response) => response.json())
      .then((files) => console.log("App.js | files", files));
  };

  const createOrSetSheet = async (fileName) => {
    const duplicates = await checkForDuplicates();
    console.log("duplicates", duplicates);

    if (duplicates.length > 0) {
      console.log(
        "Duplicates exist! Do not create spreadsheet and set current sheetId",
        duplicates[0]
      );
      setSheetId(duplicates[0].id);
    } else {
      console.log("duplicates do not exist, create new sheet");
      return createSheet(token, fileName)
        .then((response) => response.json())
        .then((sheet) => {
          console.log("Sucessfully created and set sheetID for usage", sheet);
          setSheetId(sheet.spreadsheetId);
        })
        .catch((error) => {
          console.log("App.js | ", "ERROR creating sheet", error);
        });
    }
  };

  const checkForDuplicates = async () => {
    const request = await getFilesByName(token, "My Sheet 3");
    const data = await request.json();
    return data.files;
  };

  const updateSheetData = async () => {
    if (token && sheetId) {
      return updateSheetValue(token, sheetId, 2000)
        .then(() => {
          console.log("App.js | value updated in Spreadsheet");
        })
        .catch((error) => {
          console.log("App.js | ", "ERROR updating value", error);
        });
    } else {
      console.log(
        "App.js 72 | No sheetId or Token, please generate them with the buttons before updating the sheet"
      );
    }
  };

  if (user === null) {
    return (
      <div className="App">
        <h1>Google APIs Tutorial</h1>
        <button onClick={() => login()}>Sign in with Google</button>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Logged In!</h3>
        <p>User: {user.email}</p>
        <p>Token: {token}</p>
        <button onClick={() => getDriveFiles()}>Get Files from Drive</button>
        <button onClick={() => createOrSetSheet("My Sheet 3")}>
          Create Spreadsheet
        </button>
        <button onClick={() => updateSheetData()}>Update Sheet Data</button>
      </div>
    );
  }
}

export default App;
