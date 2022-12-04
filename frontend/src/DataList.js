import React, { useContext, useEffect, useState } from "react";
import DataItem from "./COMPONENTS/DataItem";
import appContext from "./CONTEXT/AppContext";

function DataList(props) {
  const [data, setData] = useState([]);
  const [ERROR, setERROR] = useState(null);
  const [loading, setLoading] = useState(false);

  const ctx = useContext(appContext);

  const getAllDataItems = async () => {
    try {
      console.log("TRYING TO GET ALL DATA");
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/data`,
      );
      const responseData = await response.json();

      if (response.status !== 200) {
        throw new Error(responseData.message);
      }

      setData(responseData.alldata);
      ctx.setAdded("");
      setLoading(false);
    } catch (err) {
      setERROR(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDataItems();
  }, [ctx.added]);

  if (data.length === 0) {
    return (
      <>
        {loading === true ? (
          <h2 style={{ textAlign: "center" }}>LOADING....</h2>
        ) : (
          <h2 style={{ textAlign: "center" }}>No Records , maybe add some !</h2>
        )}
      </>
    );
  }

  return (
    <>
      {loading === true ? (
        <h2 style={{ textAlign: "center" }}>LOADING....</h2>
      ) : (
        <>
          {" "}
          {ERROR === null && loading === false ? null : (
            <h3 style={{ textAlign: "center" }}>{ERROR}</h3>
          )}
          {data.map((item) => (
            <DataItem key={item.id} title={item.title} id={item.id} />
          ))}{" "}
        </>
      )}
    </>
  );
}

export default DataList;
