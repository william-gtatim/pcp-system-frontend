import { PackageOpen } from "lucide-react";

type EmptyStateProps = {
    title: string;
    description?: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center text-muted-foreground">
            <PackageOpen className="h-12 w-12" strokeWidth={1.25} />

            <div className="space-y-1">
                <h3 className="text-lg font-medium text-foreground">
                    {title}
                </h3>

                {description && (
                    <p className="text-sm">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}