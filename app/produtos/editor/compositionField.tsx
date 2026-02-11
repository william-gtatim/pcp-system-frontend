import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRawMaterialsQuery } from "@/app/estoque/rawMaterialQueries"
import { Trash2 } from "lucide-react"

export type Composition = {
    rawMaterialId: number | null
    rawMaterialName: string
    quantityRequired: number | ""
}

type Props = {
    value: Composition[]
    onChange: (value: Composition[]) => void
}

export default function CompositionField({ value, onChange }: Props) {
    const { data: rawMaterials = [] } = useRawMaterialsQuery()

    const usedIds = value
        .map(item => item.rawMaterialId)
        .filter((id): id is number => id !== null)

    function handleAdd() {
        onChange([
            {
                rawMaterialId: null,
                rawMaterialName: "",
                quantityRequired: "",
            },
            ...value,
        ])
    }

    function handleRemove(index: number) {
        onChange(value.filter((_, i) => i !== index))
    }

    function handleQuantityChange(index: number, newQuantity: number | "") {
        const updated = [...value]

        updated[index] = {
            ...updated[index],
            quantityRequired: newQuantity,
        }

        onChange(updated)
    }

    function handleRawMaterialChange(index: number, rawMaterialId: number) {
        const rm = rawMaterials.find(r => r.id === rawMaterialId)
        if (!rm) return

        const updated = [...value]

        updated[index] = {
            ...updated[index],
            rawMaterialId: rm.id,
            rawMaterialName: rm.name,
        }

        onChange(updated)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Label>Matérias-primas</Label>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAdd}
                >
                    Adicionar
                </Button>
            </div>

            {value.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-3 items-end border rounded-md p-3"
                >
                    <div className="flex-1">
                        <Label className="mb-1">Matéria-prima</Label>
                        <select
                            required
                            className="w-full border rounded-md h-9 px-2"
                            value={item.rawMaterialId ?? ""}
                            onChange={e =>
                                handleRawMaterialChange(
                                    index,
                                    Number(e.target.value)
                                )
                            }
                        >
                            <option value="">Selecione</option>

                            {rawMaterials
                                .filter(rm =>
                                    rm.id === item.rawMaterialId ||
                                    !usedIds.includes(rm.id)
                                )
                                .map(rm => (
                                    <option key={rm.id} value={rm.id}>
                                        {rm.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="w-26">
                        <Label className="mb-2">Quantidade</Label>
                        <Input
                            required
                            type="number"
                            min={0}
                            step="0.01"
                            value={item.quantityRequired}
                            onChange={e =>
                                handleQuantityChange(
                                    index,
                                    e.target.value === ""
                                        ? ""
                                        : Number(e.target.value)
                                )
                            }
                        />
                    </div>

                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(index)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ))}
        </div>
    )
}