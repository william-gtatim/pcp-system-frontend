import React from "react";

export default function Main({children} : {children: React.ReactNode}) {
    return (
        <main className="flex-1 overflow-y-auto p-6 lg:ml-64">
            {children}
        </main>
    )
}