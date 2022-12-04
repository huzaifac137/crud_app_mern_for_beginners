import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import appContext from "../CONTEXT/AppContext";

function DataItem({ title, id }) {
  const [ERROR, setERROR] = useState(null);
  const [RESPONSE, setResponse] = useState(null);
  const ctx = useContext(appContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/data/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const responseData = await response.json();

      if (response.status !== 201) {
        throw new Error(responseData.message);
      }

      ctx.setAdded("DELETEED");
      setResponse(responseData.message);
      setTimeout(() => {
        setResponse(null);
      }, 1000);
    } catch (err) {
      setERROR(err.message);
    }
  };

  return (
    <div className="dataItem">
      {ERROR !== null ? <h3>{ERROR}</h3> : null}
      {RESPONSE !== null ? <h3>{RESPONSE}</h3> : null}
      <h2>{title}</h2>
      <button
        onClick={() => navigate("/edit", { state: { title: title, id: id } })}
      >
        Edit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DataItem;
