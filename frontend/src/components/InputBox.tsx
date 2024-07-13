import { ChangeEvent } from "react"

interface inputInterface {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputBox({label, placeholder, type, onChange}: inputInterface) {
  return <div className="flex flex-col gap-2">
  <label className="font-semibold text-xl">{label}</label>
  <input onChange={onChange} type={type || "text"} placeholder={placeholder} className="p-2 outline-black border-2 border-gray-300 rounded-md"/>
</div>
}
