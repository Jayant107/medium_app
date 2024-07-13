import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

export default function MakeBlog() {
    const [blog, setBlog] = useState({
        title: "",
        content: ""
    });
    const navigate = useNavigate();
    async function postBlog(){
        console.log(blog)
        const res =  await axios.post(`${BASE_URL}/api/v1/blog`, blog, {
            headers: {
                Authorization: `${Cookies.get("token")}`
            }
        });
        if(res.data.id){
            window.alert("blog created");
            navigate("/blogs");
        }
    }
  return <div className="h-screen w-screen p-5 flex flex-col gap-4">
    <input onChange={(e) => {
        setBlog({
            ...blog,
            title: e.target.value
        });
    }} className="h-20 w-full text-7xl border-none outline-none p-4" type="text" placeholder="| Title" />
    <textarea onChange={(e) => {
        setBlog({
            ...blog,
            content: e.target.value
        })
    }} className="h-[60%] w-full text-4xl p-4 outline-none border-none"  placeholder="Tell your story..."/>
    <button onClick={postBlog} className="rounded-full bg-green-600 text-white py-1 px-3 hover:bg-green-700 w-[10%]">Publish</button>
  </div>
}
