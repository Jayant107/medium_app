import { Link, useNavigate } from "react-router-dom"
import InputBox from "./InputBox"
import { SingInType } from "@jayant100x/medium-comman"
import { useState } from "react"
import { BASE_URL } from "../config";
import axios from "axios";
import Cookies from "js-cookie";

export default function Auth({type}: {type: "signup" | "signin"}) {
  const [postInputs, setPostInputs] = useState<SingInType>({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  async function sendSignInRequest(){
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/signin`, postInputs);
      const token = res.data.token;
      Cookies.set("token", token, {expires: 2})
      navigate("/blogs")
    } catch (error) {
      console.log(error)
      navigate("/signin")
      window.alert("try again")
    }
  }
  return <div className="flex justify-center items-center h-screen flex-col">
    <h1 className="text-4xl font-bold mb-2">Login into account</h1>
    <h4>Already have a account? <Link className="underline text-gray-500" to={type === "signup"? "/signin": "/"}>{type === "signup"? "signin": "signup"}</Link></h4>
    <div className="w-1/2 flex flex-col justify-center gap-2 mt-4">
        <InputBox label="Email" placeholder="jayant@gmail.com..." onChange={(e) => {
          setPostInputs({
            ...postInputs,
            email: e.target.value
          })
        }}/>
        <InputBox label="Password" type="password" placeholder="password" onChange={(e) => {
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }}/>
        <button onClick={sendSignInRequest} className="rounded-md bg-black hover:bg-gray-700 text-white font-bold text-2xl p-3 mt-2">{type === "signup"? "Sign Up" : "Sign In"}</button>
    </div>
  </div>
}
