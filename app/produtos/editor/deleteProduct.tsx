import {Button} from "@/components/ui/button";
import {useDeleteProductMutation} from "@/app/produtos/productMutations";


export default function DeleteRawMaterial({id}: {id: number}) {
    const {mutate, isPending} = useDeleteProductMutation()

    return (
        <Button
            size="sm"
            variant="destructive"
            onClick={() => mutate(id)}
            disabled={isPending}
        >
            Excluir
        </Button>
    )
}