import React from "react";

export default function Main({children} : {children: React.ReactNode}) {
    return (
        <main className="flex-1 overflow-y-auto p-2 py-6 md:p-8  lg:ml-64">
            {children}
        </main>
    )
}