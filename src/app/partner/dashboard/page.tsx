'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  Building2,
  Calendar,
  CheckCircle,
  Download,
  FileX,
  Fuel,
  LogOut,
  MapPin,
  Package,
  Scale,
  Truck,
  TrendingUp,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/config/trpc/client';
import { toast } from 'sonner';

const PartnerDashboard = () => {
  const searchParams = useSearchParams();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dateFilter, setDateFilter] = useState<'1-15' | '16-31' | 'all'>('all');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dispatch');
  const router = useRouter();

  // Get current user
  const { data: user, isLoading: userLoading } = trpc.auth.getUser.useQuery();

  // Get dashboard summary
  const { data: summaryData, isLoading: summaryLoading } =
    trpc.data.getDashboardSummary.useQuery({
      month: selectedMonth,
      year: selectedYear,
      dateRange: dateFilter,
    });

  // Get dispatch data
  const { data: dispatchData, isLoading: dispatchLoading } =
    trpc.data.getDispatchData.useQuery({
      month: selectedMonth,
      year: selectedYear,
      dateRange: dateFilter,
    });

  // Get diesel data
  const { data: dieselData, isLoading: dieselLoading } =
    trpc.data.getDieselData.useQuery({
      month: selectedMonth,
      year: selectedYear,
      dateRange: dateFilter,
    });

  // Logout mutation
  const utils = trpc.useUtils();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      // Clear all auth-related queries from cache
      utils.auth.getUser.reset();
      utils.invalidate();
      toast.success('You have been securely logged out');
      // Use replace and add small delay to ensure server session is cleared
      setTimeout(() => {
        router.replace('/');
      }, 100);
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      utils.auth.getUser.reset();
      utils.invalidate();
      toast.error('Logout failed, but local session cleared');
      setTimeout(() => {
        router.replace('/');
      }, 100);
    },
  });

  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  // Function to get the correct end date for the second half of the month
  const getSecondHalfEndDate = (month: number, year: number) => {
    const lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  };

  // Function to get the date range label
  const getDateRangeLabel = (dateRange: string) => {
    if (dateRange === '1-15') {
      return '1st to 15th';
    } else if (dateRange === '16-31') {
      const endDate = getSecondHalfEndDate(selectedMonth, selectedYear);
      return `16th to ${endDate}${endDate === 31 ? 'st' : endDate === 30 ? 'th' : endDate === 29 ? 'th' : 'th'}`;
    }
    return 'All Month';
  };

  const handleDownloadExcel = async () => {
    const XLSX = await import('xlsx');
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    if (activeTab === 'dispatch') {
      // Prepare dispatch data
      const dispatchWorksheetData = [];
      dispatchWorksheetData.push(['Date', 'Vehicle No', 'Material', 'Quantity', 'Unit', 'Destination', 'Status']);
      
      if (dispatchData?.data) {
        dispatchData.data.forEach((item) => {
          dispatchWorksheetData.push([
            new Date(item.date).toLocaleDateString(),
            item.vehicleNumber,
            item.material,
            item.quantity,
            'T',
            item.destination,
            'Completed'
          ]);
        });
      }
      
      // Create worksheet and add to workbook
      const dispatchWorksheet = XLSX.utils.aoa_to_sheet(dispatchWorksheetData);
      XLSX.utils.book_append_sheet(workbook, dispatchWorksheet, 'Dispatch Data');
      
      // Download the Excel file
      XLSX.writeFile(workbook, `dispatch_data_${selectedMonth}_${selectedYear}.xlsx`);
      
      toast.success('Dispatch data Excel file has been downloaded');
    } else if (activeTab === 'diesel') {
      // Prepare diesel data
      const dieselWorksheetData = [];
      dieselWorksheetData.push(['Date', 'Vehicle No', 'Item', 'Volume', 'Unit', 'Fuel Station', 'Status']);
      
      if (dieselData?.data) {
        dieselData.data.forEach((item) => {
          dieselWorksheetData.push([
            new Date(item.date).toLocaleDateString(),
            item.vehicleNumber,
            item.item,
            item.volume,
            'L',
            item.fuelStation,
            item.status
          ]);
        });
      }
      
      // Create worksheet and add to workbook
      const dieselWorksheet = XLSX.utils.aoa_to_sheet(dieselWorksheetData);
      XLSX.utils.book_append_sheet(workbook, dieselWorksheet, 'Diesel Data');
      
      // Download the Excel file
      XLSX.writeFile(workbook, `diesel_data_${selectedMonth}_${selectedYear}.xlsx`);
      
      toast.success('Diesel data Excel file has been downloaded');
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/partner-login');
    }
  }, [user, userLoading, router]);

  if (userLoading || !user) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  console.log(user);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200">
                  <img
                    src="/AT.png"
                    alt="Archana Transport Logo"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-foreground text-lg font-semibold">
                    Archana Transport
                  </h1>
                  <p className="text-muted-foreground text-xs">
                    Partner Portal
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl">
            Welcome back, {user?.name || user?.partnerId}
          </h2>
          <p className="text-muted-foreground">
            Here's your transportation dashboard overview
          </p>
        </motion.div>

        {/* Enhanced Date Filter & Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="text-primary h-5 w-5" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Month Filter */}
            <Select
              value={selectedMonth.toString()}
              onValueChange={(value) => setSelectedMonth(parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>

            {/* Year Filter */}
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <Select
              value={dateFilter}
              onValueChange={(value: '1-15' | '16-31' | 'all') =>
                setDateFilter(value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-15">1st to 15th</SelectItem>
                <SelectItem value="16-31">16th to {getSecondHalfEndDate(selectedMonth, selectedYear)}{getSecondHalfEndDate(selectedMonth, selectedYear) === 31 ? 'st' : getSecondHalfEndDate(selectedMonth, selectedYear) === 30 ? 'th' : getSecondHalfEndDate(selectedMonth, selectedYear) === 29 ? 'th' : 'th'}</SelectItem>
                <SelectItem value="all">Full Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDownloadExcel}
            className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Excel
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <Card className="border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Unload
              </CardTitle>
              <TrendingUp className="text-primary h-4 w-4" />
            </CardHeader>
            <CardContent>
              {summaryLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-primary text-2xl font-bold">
                  {summaryData?.dispatch.totalQuantity || '0.00'} M.T
                </div>
              )}
              <Badge variant="secondary" className="mt-2">
                {new Date(selectedYear, selectedMonth - 1).toLocaleDateString(
                  'en-US',
                  { month: 'long', year: 'numeric' }
                )}
                {dateFilter !== 'all' && ` (${getDateRangeLabel(dateFilter)})`}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Diesel
              </CardTitle>
              <Fuel className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              {summaryLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold text-orange-500">
                  {summaryData?.diesel.totalVolume || '0.00'} Ltr
                </div>
              )}
              <Badge variant="secondary" className="mt-2">
                {new Date(selectedYear, selectedMonth - 1).toLocaleDateString(
                  'en-US',
                  { month: 'long', year: 'numeric' }
                )}
                {dateFilter !== 'all' && ` (${getDateRangeLabel(dateFilter)})`}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Tables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">Transportation Data</CardTitle>
                  <CardDescription className="text-red-100">
                    View your dispatch and diesel consumption records
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value);
                  const url = new URL(window.location.href);
                  url.searchParams.set('tab', value);
                  router.replace(url.pathname + url.search);
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger
                    value="dispatch"
                    className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600 rounded-lg transition-all duration-200"
                  >
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">Dispatch Data</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="diesel"
                    className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-red-600 rounded-lg transition-all duration-200"
                  >
                    <Fuel className="h-4 w-4" />
                    <span className="font-medium">Diesel Data</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dispatch" className="mt-6">
                  {dispatchLoading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  ) : !dispatchData?.data.length ? (
                    <div className="py-16 text-center">
                      <div className="mx-auto mb-6 w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                        <FileX className="text-red-600 h-12 w-12" />
                      </div>
                      <h3 className="text-gray-900 mb-3 text-xl font-semibold">
                        No Dispatch Records Found
                      </h3>
                      <p className="text-gray-600 text-base max-w-md mx-auto">
                        No dispatch data available for the selected period. Try changing the date range or month.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-red-50 to-red-100 border-b-2 border-red-200">
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Date</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Truck className="h-4 w-4" />
                                <span>Vehicle No</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Package className="h-4 w-4" />
                                <span>Material</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Scale className="h-4 w-4" />
                                <span>Unload Quantity</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>Unload Point</span>
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dispatchData.data.map((item, index) => (
                            <TableRow key={index} className="hover:bg-red-50 transition-colors duration-200 border-b border-gray-100">
                              <TableCell className="font-medium py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <span className="text-gray-900">{new Date(item.date).toLocaleDateString()}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-sm py-4">
                                <div className="bg-gray-100 px-3 py-1 rounded-lg inline-block">
                                  {item.vehicleNumber.replace(/-/g, '')}
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
                                  {item.material}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="outline" className="font-mono bg-black text-white border-black hover:bg-gray-800">
                                  {parseFloat(item.quantity).toFixed(2)} M.T
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                                  <MapPin className="text-red-500 h-4 w-4" />
                                  <span className="text-sm text-gray-700 font-medium">{item.destination}</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="diesel" className="mt-6">
                  {dieselLoading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  ) : !dieselData?.data.length ? (
                    <div className="py-16 text-center">
                      <div className="mx-auto mb-6 w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                        <FileX className="text-red-600 h-12 w-12" />
                      </div>
                      <h3 className="text-gray-900 mb-3 text-xl font-semibold">
                        No Diesel Records Found
                      </h3>
                      <p className="text-gray-600 text-base max-w-md mx-auto">
                        No diesel data available for the selected period. Try changing the date range or month.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-red-50 to-red-100 border-b-2 border-red-200">
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Date</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Truck className="h-4 w-4" />
                                <span>Vehicle No</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Fuel className="h-4 w-4" />
                                <span>Volume</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Package className="h-4 w-4" />
                                <span>Item</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4" />
                                <span>Fuel Station</span>
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-red-900 py-4">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4" />
                                <span>Status</span>
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dieselData.data.map((item, index) => (
                            <TableRow key={index} className="hover:bg-red-50 transition-colors duration-200 border-b border-gray-100">
                              <TableCell className="font-medium py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <span className="text-gray-900">{new Date(item.date).toLocaleDateString()}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-sm py-4">
                                <div className="bg-gray-100 px-3 py-1 rounded-lg inline-block">
                                  {item.vehicleNumber.replace(/-/g, '')}
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="outline" className="font-mono bg-black text-white border-black hover:bg-gray-800">
                                  {parseFloat(item.volume).toFixed(0)} L
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
                                  {item.item}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                                  <span className="text-sm text-gray-700 font-medium">{item.fuelStation}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge
                                  variant={
                                    item.status === 'completed'
                                      ? 'default'
                                      : item.status === 'pending'
                                      ? 'outline'
                                      : 'secondary'
                                  }
                                  className={`capitalize ${
                                    item.status === 'completed'
                                      ? 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
                                      : item.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200'
                                      : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                                  }`}
                                >
                                  {item.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
