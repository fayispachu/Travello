import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import googleicon from "../assets/google.png";
import facebookicon from "../assets/facebook.png";
import axios from "axios";
import { UserContext } from "../context/UserContext";
function AdminLogin() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const loginData = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      setUser(data.document);
      console.log(data);
    } catch (error) {
      console.log(error, "Error in loginPage user fetch");
    }
  };

  return (
    <>
      <div className="flex justify-center py-14 items-center bg-gray-100">
        <div className=" drop-shadow-xl  w-[80%] h-[80vh] bg-white flex flex-row">
          <section className="bg-[#33D69F] w-[50%] h-full text-center flx items-center justify-center flex-col py-24">
            <h1 className="font-bold text-4xl text-white drop-shadow-2xl">
              Welcome
            </h1>
            <p>Fayis.k</p>
          </section>
          <section className="bg-white w-[50%] h-full flex flex-col items-center justify-center gap-5 ">
            <h1 className="text-[#33D69F] font-bold text-2xl">Admin</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email "
              className="px-11 py-3 border border-[#33D69F] "
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Password "
              className="px-11 py-3 border  border-[#33D69F] "
            />
            <div className="flex flex-row gap-5">
              <img className="w-7" src={googleicon} alt="" />
              <img className="w-7" src={facebookicon} alt="" />
            </div>
            <Link to={"/admin"}>
              <button
                onClick={loginData}
                className="bg-[#33D69F] px-[20%] py-3 font-semibold border border-[#33D69F] "
              >
                Submit
              </button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
