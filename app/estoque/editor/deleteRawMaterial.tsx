import {Button} from "@/components/ui/button";
import {useDeleteRawMaterialMutation} from "@/app/estoque/rawMaterialMutations";

export default function DeleteRawMaterial({id}: {id: number}) {
    const {mutate, isPending} = useDeleteRawMaterialMutation()

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