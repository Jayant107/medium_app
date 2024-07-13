import { useEffect, useState } from "react"
import axios from "axios";
import { BASE_URL } from "../config";
import Cookies from "js-cookie";

export default function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `${Cookies.get("token")}`
            }
        })
            .then((res) => {
                setBlogs(res.data.blogs)
                setLoading(false)
            })
    }, [])

    return {
        loading,
        blogs
    }
}
