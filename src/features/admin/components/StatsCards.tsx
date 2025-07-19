'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Users, FileSpreadsheet, TrendingUp, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/shared/components/ui/skeleton';

interface StatsData {
  totalPartners?: number;
  totalDispatchRecords?: number;
  totalDieselRecords?: number;
  activePartners?: number;
  monthlyRevenue?: number;
  pendingDispatches?: number;
}

interface StatsCardsProps {
  stats: StatsData | undefined;
  isLoading: boolean;
  className?: string;
}

export function StatsCards({ stats, isLoading, className }: StatsCardsProps) {
  const statItems = [
    {
      title: 'Total Partners',
      value: stats?.totalPartners || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Dispatch Records',
      value: stats?.totalDispatchRecords || 0,
      icon: FileSpreadsheet,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Diesel Records',
      value: stats?.totalDieselRecords || 0,
      icon: FileSpreadsheet,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Active Partners',
      value: stats?.activePartners || 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ${className}`}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {item.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${item.bgColor}`}>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value.toLocaleString()}
              </div>
              {item.title === 'Active Partners' && stats?.totalPartners && (
                <p className="text-muted-foreground text-xs">
                  {Math.round((item.value / stats.totalPartners) * 100)}% of
                  total
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
