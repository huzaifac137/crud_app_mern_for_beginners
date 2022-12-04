import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddDataItem from "./COMPONENTS/AddDataItem";
import appContext from "./CONTEXT/AppContext";
import React, { useState } from "react";
import Navbar from "./COMPONENTS/Navbar";
import DataList from "./DataList";
import EditDataItem from "./COMPONENTS/EditDataItem";

function App() {
  const [added, setAdded] = useState("");

  return (
    <appContext.Provider value={{ added: added, setAdded: setAdded }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/add" element={<AddDataItem />} />
        <Route path="/edit" element={<EditDataItem />} />
      </Routes>
    </appContext.Provider>
  );
}

export default App;
