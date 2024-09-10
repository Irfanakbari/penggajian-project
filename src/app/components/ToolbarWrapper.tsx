import {ReactNode} from "react";

export default function ToolbarWrapper({children}: {children: ReactNode}) {
    return (<div className={`flex w-full flex-row gap-3 bg-gradient-to-r from-[#010031] to-[#292751] my-2 p-2`}>
        {
            children
        }
    </div>)
}