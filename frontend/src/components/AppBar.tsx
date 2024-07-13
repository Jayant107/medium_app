import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

export default function AppBar() {
    const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-10 py-4">
        <div className="flex gap-3 items-center"> 
            <div className="flex items-center gap-2">
                <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.4093 12.0071C13.4093 15.4573 10.6314 18.2544 7.20454 18.2544C3.77771 18.2544 1 15.4582 1 12.0071C1 8.55605 3.77792 5.76001 7.20454 5.76001C10.6312 5.76001 13.4093 8.55689 13.4093 12.0071ZM20.216 12.0071C20.216 15.2551 18.8269 17.8878 17.1136 17.8878C15.4003 17.8878 14.0112 15.2542 14.0112 12.0071C14.0112 8.75999 15.4003 6.1264 17.1136 6.1264C18.8269 6.1264 20.216 8.75999 20.216 12.0071ZM23 12.0071C23 14.9171 22.5114 17.276 21.9088 17.276C21.3063 17.276 20.8177 14.9163 20.8177 12.0071C20.8177 9.09793 21.3063 6.73823 21.9091 6.73823C22.5118 6.73823 23 9.0973 23 12.0071Z"></path></svg>
                <div className="font-semibold">Medium</div>
            </div>
            <div className="font-semibold text-gray-400">Saved</div>
        </div>
        <div className="flex gap-5 items-center">
            <button onClick={() => {
                navigate("/makeblog")
            }} className="rounded-full bg-green-600 text-white py-1 px-3 hover:bg-green-700">Create Blog</button>
            <div className="flex gap-3 items-center">
                <svg className="text-gray-500 w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
                <svg className="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V18H18V10ZM20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
                <Avatar name="Jayant" size={10} textSize="2xl"/>
            </div>
        </div>
    </div>
  )
}
