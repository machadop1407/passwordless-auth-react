import Axios from "axios";
import React from "react";
import Cookies from "universal-cookie";

function Home() {
  const cookie = new Cookies();
  const testAPI = () => {
    Axios.post(
      "http://localhost:3002/test",
      {},
      { headers: { sessiontoken: cookie.get("sessionToken").session_token } }
    )
      .then((resp) => {
        alert(resp.data);
      })
      .catch((err) => {
        alert("USER NOT AUTHENTICATED");
      });
  };
  return (
    <div className="homeContainer">
      <button onClick={testAPI}> Test API</button>
    </div>
  );
}

export default Home;
