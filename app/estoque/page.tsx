'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import RawMaterialTable from "@/app/estoque/table/rawMaterialTable";
import EditRawMaterialDialog from "@/app/estoque/editor/editRawMaterial";
import { RawMaterialType } from "@/app/estoque/rawMaterialTypes";

export default function RawMaterialPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selected, setSelected] = useState<RawMaterialType | undefined>();

    function openCreate() {
        setSelected(undefined);
        setDialogOpen(true);
    }

    function openEdit(item: RawMaterialType) {
        setSelected(item);
        setDialogOpen(true);
    }



    return (
        <>
            <div className="flex justify-between mb-6">
                <h1 className="font-semibold text-2xl">Estoque</h1>
                <Button onClick={openCreate}>Adicionar</Button>
            </div>

            <RawMaterialTable onEdit={openEdit} />

            <EditRawMaterialDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                rawMaterial={selected}
            />
        </>
    );
}