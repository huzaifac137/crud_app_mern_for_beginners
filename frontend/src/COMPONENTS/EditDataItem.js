import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import appContext from "../CONTEXT/AppContext";

function EditDataItem(props) {
  const ctx = useContext(appContext);
  const navigate = useNavigate();

  const state = useLocation().state;
  let oldTitle, id;
  if (state) {
    oldTitle = state.title;
    id = state.id;
  }

  const [title, setTitle] = useState(oldTitle);
  const [ERROR, setERROR] = useState(null);
  const [RESPONSE, setResponse] = useState(null);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/data/${id}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: title,
          }),
        },
      );
      const responseData = await response.json();

      if (response.status !== 201) {
        throw new Error(responseData.message);
      }

      ctx.setAdded("ADDED");
      setResponse(responseData.message);
      setTimeout(() => {
        setResponse(null);
      }, 1000);
      setTitle("");
    } catch (err) {
      setERROR(err.message);
      setTimeout(() => {
        setERROR(null);
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {RESPONSE !== null ? <h3>{RESPONSE}</h3> : null}
      {ERROR !== null ? <h3>{ERROR}</h3> : null}
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        value={title}
      />
      <button> Update </button>
    </form>
  );
}

export default EditDataItem;
