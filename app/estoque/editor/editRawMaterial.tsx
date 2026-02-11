import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { RawMaterialType } from "@/app/estoque/rawMaterialQueries";
import {
    useCreateRawMaterialMutation,
    useUpdateRawMaterialMutation,
} from "@/app/estoque/rawMaterialMutations";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rawMaterial?: RawMaterialType;
};

export default function EditRawMaterialDialog({
                                                  open,
                                                  onOpenChange,
                                                  rawMaterial,
                                              }: Props) {
    const [name, setName] = useState("");
    const [stockQuantity, setStockQuantity] = useState<number | "">("");

    const isEdit = !!rawMaterial;

    const createMutation = useCreateRawMaterialMutation();
    const updateMutation = useUpdateRawMaterialMutation();

    useEffect(() => {
        if (rawMaterial) {
            setName(rawMaterial.name);
            setStockQuantity(rawMaterial.stockQuantity);
        } else {
            setName("");
            setStockQuantity("");
        }
    }, [rawMaterial]);

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const data = {
            name,
            stockQuantity: Number(stockQuantity),
        };

        if (isEdit && rawMaterial) {
            updateMutation.mutate(
                { id: rawMaterial.id, data },
                { onSuccess: () => onOpenChange(false) }
            );
        } else {
            createMutation.mutate(
                data,
                { onSuccess: () => onOpenChange(false) }
            );
        }
        setName("")
        setStockQuantity("");
    }

    const isSubmitting =
        createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Editar matéria-prima" : "Nova matéria-prima"}
                        </DialogTitle>
                        <DialogDescription>
                            {isEdit
                                ? "Atualize os dados da matéria-prima"
                                : "Informe os dados para cadastro no estoque"}
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="mb-6 mt-6">
                        <Field>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="stockQuantity">Quantidade em estoque</Label>
                            <Input
                                id="stockQuantity"
                                type="number"
                                min={0}
                                value={stockQuantity}
                                onChange={e =>
                                    setStockQuantity( e.target.value === "" ? "" : Number(e.target.value))
                                }
                                required
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose
                            render={<Button variant="outline">Cancelar</Button>}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isEdit ? "Salvar alterações" : "Adicionar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}