import { Skeleton } from "@/components/ui/skeleton";

export function SummarySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <Skeleton className="mb-4 h-5 w-32" />
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((j) => (
              <div key={j} className="space-y-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-5 h-12 w-full" />
        </div>
      ))}
    </div>
  );
}
