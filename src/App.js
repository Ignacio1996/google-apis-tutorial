import React, { useState } from "react";
import { LoginWithGoogle } from "./auth";
import { getFiles, getFilesByName } from "./drive";
import { createSheet } from './sheets';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [sheetId, setSheetId] = useState(null);

  const login = () => {
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

  const getDriveFiles = () => {
    return getFiles(token)
      .then((response) => response.json())
      .then((files) => console.log("App.js | files", files));
  };

  const createOrSetSheet = async (fileName) => {
    const duplicates = await checkForDuplicates();
    console.log("duplicates", duplicates);
    
    if (duplicates.length > 0) {
      console.log("Duplicates exist! Do not create spreadsheet and set current sheetId", duplicates[0].id);
      setSheetId(duplicates[0].id)
    } else {
      console.log("duplicates do not exist, create new sheet");
      return createSheet(token, fileName)
        .then(() => {
          console.log("App.js | sheet created!");
        })
        .catch((error) => {
          console.log("App.js | ", "ERROR creating sheet", error);
        });
    }
  };

  const checkForDuplicates = async () => {
    const request = await getFilesByName(token, "My Sheet 1");
    const data = await request.json();
    return data.files;
  }

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
        <button onClick={() => createOrSetSheet("My Sheet 1")}>Create Spreadsheet</button>
      </div>
    );
  }
}

export default App;
