export default function Label({text, children, marginBottom = true}){
    return <label className={"flex-col " + (marginBottom ? "mb-10px" : "")}>
        <p className="m-0">{text}</p>
        {children}
    </label>
}