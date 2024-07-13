import { Link } from "react-router-dom"
import Avatar from "./Avatar"
interface inputTypes {
    id: string
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}
export default function BlogCard({id, authorName, title, content, publishedDate}: inputTypes) {
  return (
    <Link to={`/blog/${id}`}>
        <div className="border-b-2 border-slate-900 flex flex-col gap-4 pb-6 cursor-pointer">
        <div className="flex flex-col gap-1">
            <div>
                <Avatar name={authorName}/> <span className="font-semibold text-xl">{authorName}</span> <span className="text-slate-400 text-sm">&#9679;</span> <span className="text-gray-500">{publishedDate}</span>
            </div>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div>
                {content.length >= 100? `${content.substring(0, 300)}...`: `${content}`}
            </div>
        </div>
        <div className="text-gray-500">{`${Math.floor(content.length / 100)} min`}</div>
        </div>
    </Link>
  )
}
