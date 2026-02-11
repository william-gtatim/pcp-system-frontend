'use client';

import {Button} from "@/components/ui/button";
import ProductTable from "@/app/produtos/table/productTable";
import {ProductType} from "@/app/produtos/productQueries";
import {useState} from "react";
import {RawMaterialType} from "@/app/estoque/rawMaterialQueries";
import EditProductDialog from "@/app/produtos/editor/editProductDialog";

export default function Products(){
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selected, setSelected] = useState<ProductType | undefined>();

    function openCreate() {
        setSelected(undefined);
        setDialogOpen(true);
    }

    function openEdit(item: ProductType) {
        setSelected(item);
        setDialogOpen(true);
    }


    return (
        <>
            <div className="flex justify-between mb-6">
                <h1 className="font-semibold text-2xl">Produtos</h1>
                <Button onClick={openCreate}>Adicionar</Button>
            </div>

            <ProductTable onEdit={openEdit}/>

            <EditProductDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={selected} />

        </>
    )
}