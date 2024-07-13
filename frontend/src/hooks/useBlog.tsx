import { useEffect, useState } from "react"
import axios from "axios";
import { BASE_URL } from "../config";
import Cookies from "js-cookie";

interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export default function useBlog({id}: {id: string}) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `${Cookies.get("token")}`
            }
        })
            .then((res) => {
                setBlog(res.data.blog)
                setLoading(false)
            })
    }, [id])

    return {
        loading,
        blog
    }
}
