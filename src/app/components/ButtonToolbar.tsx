import {ReactNode} from "react";

export default function ButtonToolbar({title, icon, onClick, enable=true}: { title: string; icon: ReactNode; onClick?: () => void; enable?: boolean }){
    return (
        <span
            className={`${enable ? "hover:cursor-pointer rounded hover:bg-[#e0dfe1] hover:text-black" : ""} p-1 text-xs flex flex-row items-center justify-center gap-1 ${!enable ? "text-gray-400" : "text-white"}`}
            onClick={enable ? onClick : undefined}>
            {
                icon
            }
            <span>{
                title
            }</span>
        </span>
    )
}