import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SpinnerBlock } from "@/components/ui/spinner";
import EmptyState from "@/components/ui/EmptyState";
import { useProductsQuery } from "./planningQueries";

export default function PlanningTable() {
    const { data, isLoading } = useProductsQuery();

    if (isLoading) {
        return (
            <div className="pt-6">
                <SpinnerBlock />
            </div>
        );
    }

    if (!data || data.items.length === 0) {
        return (
            <div className="pt-10">
                <EmptyState
                    title="Nenhum planejamento disponível"
                    description="Adicione matéria-prima e produtos para ver aqui recomendações"
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">
                            Receita Total
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {item.name}
                            </TableCell>

                            <TableCell className="text-right">
                                {item.quantity} unidades
                            </TableCell>

                            <TableCell className="text-right font-semibold">
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(item.totalRevenue)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end border-t pt-4">
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                        Receita total estimada
                    </p>
                    <p className="text-2xl font-bold">
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(data.totalRevenue)}
                    </p>
                </div>
            </div>
        </div>
    );
}