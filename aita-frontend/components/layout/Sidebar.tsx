"use client"

import { useState } from "react"

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    return(
        <div className="flex h-screen">
        <div className={`h-screen bg-background text-foreground flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>  

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 m-2 rounded-lg hover:bg-white/10 self-end">
            {collapsed ? "→" : "←"}
          </button>
        </div>
        <main className="flex-1 bg-card text-card-foreground overflow-y-auto">
        chat
        </main>
    </div>
    );
}