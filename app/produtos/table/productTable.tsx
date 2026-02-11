import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/app/produtos/productQueries";
import { useProductsQuery } from "@/app/produtos/productQueries";
import DeleteProduct from "@/app/produtos/editor/deleteProduct";
import { SpinnerBlock } from "@/components/ui/spinner";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
    onEdit: (item: ProductType) => void;
};

export default function ProductTable({ onEdit }: Props) {
    const { data = [], isLoading } = useProductsQuery();

    console.log("Products:", data);


    if (isLoading) {
        return (
            <div className="pt-5">
                <SpinnerBlock />
            </div>
        );
    }

    if (!isLoading && data.length === 0) {
        return (
            <div className="pt-10">
                <EmptyState
                    title="Nenhum produto cadastrado"
                    description="Adicione produtos para planejar a produção"
                />
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Matérias-primas</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.code}</TableCell>

                        <TableCell>{item.name}</TableCell>

                        <TableCell>
                            {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(item.price)}
                        </TableCell>

                        <TableCell>
                            {item.composition.length === 0 ? (
                                <span className="text-muted-foreground text-sm">
                            Nenhuma matéria-prima
                        </span>
                            ) : (
                                <ul className="space-y-1 text-sm">
                                    {item.composition.map((c, index) => (
                                        <li key={index} className="flex gap-2">
                                            <span className="text-muted-foreground text-sm">{c.rawMaterialName}</span>
                                            <span className="text-muted-foreground text-sm">({c.quantityRequired} unidades)</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </TableCell>

                        <TableCell className="text-right space-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onEdit(item)}
                            >
                                Editar
                            </Button>

                            <DeleteProduct id={item.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}