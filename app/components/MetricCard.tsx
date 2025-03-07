import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  iconBg: string;
}

export function MetricCard({
  title,
  value,
  trend,
  icon,
  iconBg,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-1 text-2xl font-bold">{value}</h3>
            <p className="mt-1 text-xs text-emerald-500">{trend}</p>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
