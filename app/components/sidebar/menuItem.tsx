'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconMap } from "./iconMap";

export type MenuItemType = {
    name: string;
    icon: keyof typeof iconMap;
    route: string;
};

export default function MenuItem({ item }: { item: MenuItemType }) {
    const pathname = usePathname();
    const active = pathname === item.route;

    const Icon = iconMap[item.icon];

    return (
        <li>
            <Link
                href={item.route}
                className={`block w-full p-2 rounded-lg hover:bg-gray-100 ${
                    active ? 'bg-gray-100' : ''
                }`}
            >
                <div className="flex gap-4 items-center">
                    <Icon
                        size={22}
                        strokeWidth={1.2}
                    />
                    <span
                        className="text-sm font-medium"
                    >
                        {item.name}
                    </span>
                </div>
            </Link>
        </li>
    );
}