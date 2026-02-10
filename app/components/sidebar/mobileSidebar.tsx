import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent, DrawerHeader, DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Menu} from 'lucide-react'
import Sidebar from "@/app/components/sidebar/sidebar";
import MenuSidebar from "@/app/components/sidebar/menu";

export function MobileSidebar() {
    return (
        <Drawer key="sidebar"  direction="left" >
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Menu strokeWidth={1.25} />
                </Button>
            </DrawerTrigger>

            <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
                <DrawerHeader>
                    <DrawerTitle >Menu</DrawerTitle>
                </DrawerHeader>
                <MenuSidebar />
            </DrawerContent>
        </Drawer>
    )
}
