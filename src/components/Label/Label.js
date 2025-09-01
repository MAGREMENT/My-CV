export default function Label({text, children}){
    return <label className="flex-col">
        <p className="m-0">{text}</p>
        {children}
    </label>
}