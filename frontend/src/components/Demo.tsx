import { PropsWithChildren, ReactNode } from "react";

function Demo({ monInfo, children }: PropsWithChildren & { monInfo: string }) {
//function Demo( { children } : { children: React.ReactNode}) {
    return (
        <div>
            Demo {monInfo}
            {children}
        </div>
    )
}

export default Demo;