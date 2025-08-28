import { Outlet } from "react-router-dom"

export default function Main() {
    return <div className="full-screen-size">
        <Outlet></Outlet>
    </div>
}
