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
import { ProductType } from "@/app/produtos/productQueries";
import {
    useCreateProductMutation,
    useUpdateProductMutation,
} from "@/app/produtos/productMutations";
import CompositionField, { Composition } from "./compositionField";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: ProductType;
};

export default function EditProductDialog({ open, onOpenChange, product }: Props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [composition, setComposition] = useState<Composition[]>([]);

    const isEdit = !!product;

    const createMutation = useCreateProductMutation();
    const updateMutation = useUpdateProductMutation();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setComposition(product.composition ?? []);
        } else {
            setName("");
            setPrice("");
            setComposition([]);
        }
    }, [product]);

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()

        const data = {
            name,
            price: Number(price),
            composition: composition.map(item => ({
                rawMaterialId: item.rawMaterialId,
                quantityRequired: item.quantityRequired,
            })),
        }

        if (isEdit && product) {
            updateMutation.mutate(
                { id: product.id, data },
                { onSuccess: () => onOpenChange(false) }
            )
        } else {
            createMutation.mutate(
                data,
                { onSuccess: () => onOpenChange(false) }
            )
        }
    }

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar produto" : "Novo produto"}</DialogTitle>
                    <DialogDescription>Informe os dados do produto</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="no-scrollbar -mx-6 max-h-[60vh] overflow-y-auto px-6">
                        <FieldGroup className="mt-6 mb-6">
                            <Field>
                                <Label>Nome</Label>
                                <Input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <Label>Valor</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={price}
                                    onChange={e =>
                                        setPrice(
                                            e.target.value === ""
                                                ? ""
                                                : Number(e.target.value)
                                        )
                                    }
                                    required
                                />
                            </Field>
                        </FieldGroup>

                        <CompositionField value={composition} onChange={setComposition} />
                    </div>

                    <DialogFooter className="mt-6">
                        <DialogClose render={<Button variant="outline">Cancelar</Button>} />
                        <Button type="submit" disabled={isSubmitting || composition.length === 0}>
                            {isEdit ? "Salvar" : "Adicionar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}