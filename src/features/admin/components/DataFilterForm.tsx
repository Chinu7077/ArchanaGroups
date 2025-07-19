'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/components/ui/button';
import { dataFilterSchema } from '@/config/db/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Calendar, Filter, RotateCcw } from 'lucide-react';

// Using centralized schema from database config

type DataFilterData = z.infer<typeof dataFilterSchema>;

interface DataFilterFormProps {
  onFilter: (data: DataFilterData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<DataFilterData>;
  className?: string;
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const DATE_RANGES = [
  { value: 'all', label: 'Entire Month' },
  { value: '1-15', label: '1st - 15th' },
  { value: '16-31', label: '16th - End' },
];

// Generate years array (last 5 years and next 5 years)
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    years.push({ value: year, label: year.toString() });
  }
  return years;
};

export function DataFilterForm({
  onFilter,
  isLoading = false,
  defaultValues,
  className,
}: DataFilterFormProps) {
  const form = useForm({
    resolver: zodResolver(dataFilterSchema),
    mode: 'onChange',
    defaultValues: {
      month: defaultValues?.month ?? new Date().getMonth() + 1,
      year: defaultValues?.year ?? new Date().getFullYear(),
      dateRange: defaultValues?.dateRange ?? 'all',
    },
  });

  const {
    formState: { errors, isValid },
    reset,
    watch,
  } = form;

  const watchedValues = watch();

  const handleFormSubmit = (data: DataFilterData) => {
    onFilter(data);
  };

  const handleReset = () => {
    const currentDate = new Date();
    const resetValues = {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      dateRange: 'all' as const,
    };
    reset(resetValues);
    onFilter(resetValues);
  };

  const getSelectedMonthName = () => {
    const month = MONTHS.find((m) => m.value === watchedValues.month);
    return month?.label || '';
  };

  const getSelectedRangeLabel = () => {
    const range = DATE_RANGES.find((r) => r.value === watchedValues.dateRange);
    return range?.label || '';
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          Data Filter
        </CardTitle>
        <CardDescription>
          Filter data by month, year, and date range
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Month Selection */}
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {MONTHS.map((month) => (
                            <SelectItem
                              key={month.value}
                              value={month.value.toString()}
                            >
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year Selection */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {generateYears().map((year) => (
                            <SelectItem
                              key={year.value}
                              value={year.value.toString()}
                            >
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Range Selection */}
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Range</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          {DATE_RANGES.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Current Selection Display */}
            {isValid && (
              <div className="flex flex-wrap gap-2 rounded-lg bg-blue-50 p-3">
                <span className="text-sm text-blue-700">Selected:</span>
                <Badge variant="secondary">
                  {getSelectedMonthName()} {watchedValues.year}
                </Badge>
                <Badge variant="outline">{getSelectedRangeLabel()}</Badge>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={isLoading || !isValid}
                className="flex-1"
              >
                <Filter className="mr-2 h-4 w-4" />
                Apply Filter
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>

        {/* Enhanced development helper */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 rounded bg-gray-100 p-2 text-xs">
            <p className="font-semibold">Form State (Dev Only):</p>
            <p>Valid: {isValid ? '✅' : '❌'}</p>
            <p>Errors: {Object.keys(errors).join(', ') || 'None'}</p>
            <details className="mt-1">
              <summary className="cursor-pointer">Filter Values</summary>
              <pre className="mt-1 text-xs">
                {JSON.stringify(watchedValues, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Re-export schema type for convenience
export type { DataFilterData };
