import MenuItem from "@/app/components/sidebar/menuItem";
import { MenuItemType } from "@/app/components/sidebar/menuItem";

const menuItems: MenuItemType[] = [
    { name: "Planejamento", icon: "planejamento", route: "/" },
    { name: "Produtos", icon: "produtos", route: "/produtos" },
    { name: "Estoque", icon: "estoque", route: "/estoque" }
];

export default function MenuSidebar() {
    return (
        <nav className="flex flex-1 flex-col overflow-y-auto p-4">
            <ul className="flex flex-1 flex-col gap-2">
                {menuItems.map(item => (
                    <MenuItem key={item.route} item={item} />
                ))}
            </ul>
        </nav>
    );
}