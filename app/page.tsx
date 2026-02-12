'use client';

import PlanningTable from "@/app/planning/planningTable";

export default function ProductionPlanningPage() {
    return (
        <>
            <div className="mb-6">
                <h1 className="font-semibold text-2xl">
                    Sugestão de produção
                </h1>
                <p className="text-muted-foreground text-sm mt-2">
                    Produção possível considerando a matéria-prima disponível em estoque
                </p>
            </div>

            <PlanningTable />
        </>
    );
}