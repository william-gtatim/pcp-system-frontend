import Image from "next/image";
import Link from "next/link";
import {MobileSidebar} from "@/app/components/sidebar/mobileSidebar";

export function Header() {
    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-color px-2 md:px-4 bg-white">
            <Link href="/" className="flex items-center gap-3">
                <div className="flex lg:hidden">
                    <MobileSidebar />
                </div>
                <Image
                    src="/image/logo.svg"
                    alt=""
                    aria-hidden="true"
                    width={30}
                    height={30}
                />
                <p className="font-semibold text-lg leading-4">
                  Planejamento de produção
                </p>
            </Link>

        </header>
    )
}