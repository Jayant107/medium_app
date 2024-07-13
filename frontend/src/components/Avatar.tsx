export default function Avatar({name, size = 6, textSize} : {name: string, size?: number, textSize?: string}) {
  return (
    
    <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-medium text-gray-600 dark:text-gray-300 text-${textSize}`}>{name[0].toUpperCase()}</span>
    </div>

  )
}
