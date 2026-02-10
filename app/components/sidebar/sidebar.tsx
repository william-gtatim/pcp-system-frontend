import MenuSidebar from "@/app/components/sidebar/menu";


export default function Sidebar() {
    return (
        <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col border-r border-color mt-16">
           <MenuSidebar />
        </aside>
    )
}