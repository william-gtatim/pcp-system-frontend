'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu } from 'lucide-react'
import MenuSidebar from "@/app/components/sidebar/menu"

export function MobileSidebar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <Drawer
            direction="left"
            open={open}
            onOpenChange={setOpen}
        >
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Menu strokeWidth={1.25} />
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <MenuSidebar />
            </DrawerContent>
        </Drawer>
    )
}