import { Link, useNavigate } from "react-router-dom"
import InputBox from "./InputBox"
import { SignUpType } from "@jayant100x/medium-comman"
import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../config"
import Cookies from "js-cookie";

export default function Auth({type}: {type: "signup" | "signin"}) {
  const [postInputs, setPostInputs] = useState<SignUpType>({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  async function sendSignUpRequest(){
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/signup`, postInputs);
      const token = res.data.token;
      Cookies.set("token", token, {expires: 2})
      navigate("/blogs")
    } catch (error) {
      console.log(error)
      navigate("/signup")
      window.alert("try again")
    }
  }
  return <div className="flex justify-center items-center h-screen flex-col">
    <h1 className="text-4xl font-bold mb-2">Create an account</h1>
    <h4>Already have a account? <Link className="underline text-gray-500" to={type === "signup"? "/signin": "/signup"}>{type === "signup"? "signin": "signup"}</Link></h4>
    <div className="w-1/2 flex flex-col justify-center gap-2 mt-4">
        <InputBox label="Username" placeholder="Jayant Prakash Sharma...." onChange={(e) => {
          setPostInputs({
            ...postInputs,
            name: e.target.value
          })
        }}/>
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
        <button className="rounded-md bg-black hover:bg-gray-700 text-white font-bold text-2xl p-3 mt-2" onClick={sendSignUpRequest}>{type === "signup"? "Sign Up" : "Sign In"}</button>
    </div>
  </div>
}
