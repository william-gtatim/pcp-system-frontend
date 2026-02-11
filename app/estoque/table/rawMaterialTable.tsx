'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RawMaterialType } from "@/app/estoque/rawMaterialTypes";
import { useRawMaterialsQuery } from "@/app/estoque/rawMaterialQueries";
import DeleteRawMaterial from "@/app/estoque/table/deleteRawMaterial";
import { SpinnerBlock } from "@/components/ui/spinner";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
    onEdit: (item: RawMaterialType) => void;
};

export default function RawMaterialTable({ onEdit }: Props) {
    const { data = [], isLoading } = useRawMaterialsQuery();

    if (isLoading) {
        return <div className="pt-5"><SpinnerBlock /></div>;
    }
    if(!isLoading && data.length === 0) {
        return <div className="pt-10">
            <EmptyState
                title="Nenhuma matéria-prima cadastrada"
                description="Adicione os insumos para controlar o estoque"
            />
        </div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.stockQuantity}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onEdit(item)}
                            >
                                Editar
                            </Button>
                            <DeleteRawMaterial id={item.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}