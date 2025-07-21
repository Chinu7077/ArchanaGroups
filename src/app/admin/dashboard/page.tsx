'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import {
  Upload,
  Shield,
  Users,
  FileSpreadsheet,
  Plus,
  MoreHorizontal,
  LogOut,
  Download,
  Trash2,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  Copy,
  X,
  Pencil,
  MessageCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/config/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { addMonths, format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { Textarea } from '@/shared/components/ui/textarea';

// Define Zod schemas
const addPartnerSchema = z.object({
  name: z
    .string()
    .min(1, 'Partner name is required')
    .min(2, 'Partner name must be at least 2 characters')
    .max(100, 'Partner name must be less than 100 characters'),
});

type AddPartnerFormData = z.infer<typeof addPartnerSchema>;

// Add validation schemas
const dispatchRecordSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  material: z.string().min(1, 'Material is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  destination: z.string().min(1, 'Destination is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
});

const dieselRecordSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  volume: z.string().min(1, 'Volume is required'),
  item: z.string().min(1, 'Item is required'),
  fuelStation: z.string().min(1, 'Fuel station is required'),
  status: z.string().min(1, 'Status is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
});

// Define the exact types returned by TRPC
type PartnerSummary = {
  id: string;
  name: string;
  partnerId: string;
  createdAt: Date;
  lastLogin: Date | null;
};

const AdminDashboard = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [showAddPartnerDialog, setShowAddPartnerDialog] = useState(false);
  const [dispatchFile, setDispatchFile] = useState<File | null>(null);
  const [dieselFile, setDieselFile] = useState<File | null>(null);
  const [temporaryPasswords, setTemporaryPasswords] = useState<
    Record<string, string>
  >({});
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [partnerToReset, setPartnerToReset] = useState<PartnerSummary | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<PartnerSummary | null>(
    null
  );
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const router = useRouter();
  const [clearAllDataDialogOpen, setClearAllDataDialogOpen] = useState(false);

  // Data management state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [recordDeleteDialogOpen, setRecordDeleteDialogOpen] = useState(false);
  const [recordType, setRecordType] = useState<'dispatch' | 'diesel'>('dispatch');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'thisMonth', 'lastMonth', 'custom'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter functions
  const filterRecords = (records: any[], type: 'dispatch' | 'diesel') => {
    if (!records) return [];
    
    let filtered = [...records];

    try {
      // Date filtering
      if (dateFilter !== 'all') {  // Only apply date filtering if not "all"
        let start: Date | null = null;
        let end: Date | null = null;
        
        switch (dateFilter) {
          case 'thisMonth':
            start = startOfMonth(new Date());
            end = endOfMonth(new Date());
            break;
          case 'lastMonth':
            start = startOfMonth(addMonths(new Date(), -1));
            end = endOfMonth(addMonths(new Date(), -1));
            break;
          case 'custom':
            if (startDate && endDate) {
              start = new Date(startDate);
              end = new Date(endDate);
              end.setHours(23, 59, 59, 999);
            }
            break;
        }

        if (start && end) {
          filtered = filtered.filter(record => {
            try {
              const recordDate = new Date(record.date);
              return recordDate >= start! && recordDate <= end!;
            } catch (e) {
              console.error('Invalid date in record:', record);
              return false;
            }
          });
        }
      }

      // Search term filtering
      if (searchTerm?.trim()) {
        const searchLower = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(record => {
          try {
            if (type === 'dispatch') {
              return (
                String(record.vehicleNumber || '').toLowerCase().includes(searchLower) ||
                String(record.material || '').toLowerCase().includes(searchLower) ||
                String(record.destination || '').toLowerCase().includes(searchLower) ||
                String(record.ownerName || '').toLowerCase().includes(searchLower) ||
                String(record.quantity || '').includes(searchLower) ||
                new Date(record.date).toLocaleDateString().includes(searchLower)
              );
            } else {
              return (
                String(record.vehicleNumber || '').toLowerCase().includes(searchLower) ||
                String(record.item || '').toLowerCase().includes(searchLower) ||
                String(record.fuelStation || '').toLowerCase().includes(searchLower) ||
                String(record.status || '').toLowerCase().includes(searchLower) ||
                String(record.ownerName || '').toLowerCase().includes(searchLower) ||
                String(record.volume || '').includes(searchLower) ||
                new Date(record.date).toLocaleDateString().includes(searchLower)
              );
            }
          } catch (e) {
            console.error('Error filtering record:', record);
            return false;
          }
        });
      }

      return filtered;
    } catch (e) {
      console.error('Error in filterRecords:', e);
      return records; // Return original records if filtering fails
    }
  };

  // Get data
  const { data: dispatchData, refetch: refetchDispatch } = trpc.admin.getAllDispatchRecords.useQuery();
  const { data: dieselData, refetch: refetchDiesel } = trpc.admin.getAllDieselRecords.useQuery();
  
  // Mutations
  const addDispatchMutation = trpc.admin.addDispatchRecord.useMutation({
    onSuccess: () => {
      toast.success('Dispatch record added successfully');
      refetchDispatch();
      setAddDialogOpen(false);
      recordForm.reset();
    },
  });
  
  const editDispatchMutation = trpc.admin.editDispatchRecord.useMutation({
    onSuccess: () => {
      toast.success('Dispatch record updated successfully');
      refetchDispatch();
      setAddDialogOpen(false);
      recordForm.reset();
    },
  });
  
  const deleteDispatchMutation = trpc.admin.deleteDispatchRecord.useMutation({
    onSuccess: () => {
      toast.success('Dispatch record deleted successfully');
      refetchDispatch();
      setRecordDeleteDialogOpen(false);
    },
  });
  
  const addDieselMutation = trpc.admin.addDieselRecord.useMutation({
    onSuccess: () => {
      toast.success('Diesel record added successfully');
      refetchDiesel();
      setAddDialogOpen(false);
      recordForm.reset();
    },
  });
  
  const editDieselMutation = trpc.admin.editDieselRecord.useMutation({
    onSuccess: () => {
      toast.success('Diesel record updated successfully');
      refetchDiesel();
      setAddDialogOpen(false);
      recordForm.reset();
    },
  });
  
  const deleteDieselMutation = trpc.admin.deleteDieselRecord.useMutation({
    onSuccess: () => {
      toast.success('Diesel record deleted successfully');
      refetchDiesel();
      setRecordDeleteDialogOpen(false);
    },
  });

  // Clear all data mutation
  const clearAllDataMutation = trpc.admin.clearAllData.useMutation({
    onSuccess: () => {
      toast.success('All data has been cleared successfully');
      // Refresh all data
      refetchStats();
      refetchPartners();
      refetchDispatch();
      refetchDiesel();
      setClearAllDataDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to clear data: ${error.message}`);
    },
  });

  // Form
  const recordForm = useForm({
    resolver: zodResolver(recordType === 'dispatch' ? dispatchRecordSchema : dieselRecordSchema),
    defaultValues: {
      date: '',
      vehicleNumber: '',
      material: '',
      quantity: '',
      destination: '',
      volume: '',
      item: '',
      fuelStation: '',
      status: 'completed',
      ownerName: '',
    },
  });

  // Handlers
  const handleAddRecord = (type: 'dispatch' | 'diesel') => {
    setRecordType(type);
    setSelectedRecord(null);
    recordForm.reset({
      date: '',
      vehicleNumber: '',
      material: '',
      quantity: '',
      destination: '',
      volume: '',
      item: '',
      fuelStation: '',
      status: 'completed',
      ownerName: '',
    });
    setAddDialogOpen(true);
  };

  const handleEditRecord = (type: 'dispatch' | 'diesel', record: any) => {
    setRecordType(type);
    setSelectedRecord(record);
    
    // Format date for input
    const formattedDate = new Date(record.date).toISOString().split('T')[0];
    
    recordForm.reset({
      ...record,
      date: formattedDate,
    });
    setAddDialogOpen(true);
  };

  const handleDeleteRecord = (type: 'dispatch' | 'diesel', record: any) => {
    setRecordType(type);
    setSelectedRecord(record);
    setRecordDeleteDialogOpen(true);
  };

  const handleRecordSubmit = (data: any) => {
    // Add partnerId from selected record if editing
    const submitData = {
      ...data,
      partnerId: selectedRecord?.partnerId || user?.id,
    };

    if (recordType === 'dispatch') {
      if (selectedRecord) {
        editDispatchMutation.mutate({ ...submitData, id: selectedRecord.id });
      } else {
        addDispatchMutation.mutate(submitData);
      }
    } else {
      if (selectedRecord) {
        editDieselMutation.mutate({ ...submitData, id: selectedRecord.id });
      } else {
        addDieselMutation.mutate(submitData);
      }
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedRecord) return;
    
    if (recordType === 'dispatch') {
      deleteDispatchMutation.mutate({ id: selectedRecord.id });
    } else {
      deleteDieselMutation.mutate({ id: selectedRecord.id });
    }
  };

  // Get current user
  const { data: user, isLoading: userLoading } = trpc.auth.getUser.useQuery();

  // Get partner statistics
  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = trpc.admin.getPartnerStats.useQuery();

  // Get partners list
  const {
    data: partners,
    isLoading: partnersLoading,
    refetch: refetchPartners,
  } = trpc.admin.getPartners.useQuery();

  // Mutations
  const createPartnerMutation = trpc.admin.createPartner.useMutation({
    onSuccess: (data: { id: string; partnerId: string; password: string }) => {
      // Store the password temporarily for copying
      setTemporaryPasswords((prev) => ({
        ...prev,
        [data.id]: data.password,
      }));

      // Clear after 5 minutes for security
      setTimeout(
        () => {
          setTemporaryPasswords((prev) => {
            const updated = { ...prev };
            delete updated[data.id];
            return updated;
          });
        },
        5 * 60 * 1000
      );

      toast.success(
        `Partner created! ID: ${data.partnerId}, Password: ${data.password}`
      );
      setShowAddPartnerDialog(false);
      addPartnerForm.reset();
      refetchPartners();
      refetchStats();
    },
    onError: (error: { message: string }) => {
      toast.error(`Failed to create partner: ${error.message}`);
    },
  });

  const resetPasswordMutation = trpc.admin.resetPartnerPassword.useMutation({
    onSuccess: (
      data: { newPassword: string },
      variables: { partnerId: string }
    ) => {
      // Store the new password temporarily for copying using the ID we sent
      setTemporaryPasswords((prev) => ({
        ...prev,
        [variables.partnerId]: data.newPassword,
      }));

      // Clear after 5 minutes for security
      setTimeout(
        () => {
          setTemporaryPasswords((prev) => {
            const updated = { ...prev };
            delete updated[variables.partnerId];
            return updated;
          });
        },
        5 * 60 * 1000
      );

      toast.success(`Password reset! New password: ${data.newPassword}`);
      refetchPartners();
    },
    onError: (error: { message: string }) => {
      toast.error(`Failed to reset password: ${error.message}`);
    },
  });

  const deletePartnerMutation = trpc.admin.deletePartner.useMutation({
    onSuccess: () => {
      toast.success('Partner deleted successfully!');
      refetchPartners();
      refetchStats();
    },
    onError: () => {
      toast.error('Failed to delete partner');
    },
  });

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

  // Add Partner Form
  const addPartnerForm = useForm<AddPartnerFormData>({
    resolver: zodResolver(addPartnerSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleCreatePartner = (data: AddPartnerFormData) => {
    createPartnerMutation.mutate({ name: data.name.trim() });
  };

  const handleResetPasswordClick = (partner: PartnerSummary) => {
    setPartnerToReset(partner);
    setResetPasswordDialogOpen(true);
  };

  const handleConfirmResetPassword = () => {
    if (partnerToReset) {
      resetPasswordMutation.mutate({ partnerId: partnerToReset.id });
      setResetPasswordDialogOpen(false);
      setPartnerToReset(null);
    }
  };

  const handleDeletePartnerClick = (partner: PartnerSummary) => {
    setPartnerToDelete(partner);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDeletePartner = () => {
    if (partnerToDelete) {
      deletePartnerMutation.mutate({ partnerId: partnerToDelete.id });
      setDeleteDialogOpen(false);
      setPartnerToDelete(null);
    }
  };

  const handleCopyCredentials = (partner: PartnerSummary) => {
    const password = temporaryPasswords[partner.id];

    if (!password) {
      toast.error('Please reset the password first to copy credentials');
      return;
    }
    const credentials = `Partner ID: ${partner.partnerId}\nPassword: ${password}`;
    navigator.clipboard.writeText(credentials);
    toast.success('Partner credentials have been copied to clipboard');
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: 'dispatch' | 'diesel'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clear any previous errors when new files are selected
      setFileUploadError(null);
      
      if (fileType === 'dispatch') {
        setDispatchFile(file);
      } else {
        setDieselFile(file);
      }
    }
  };

  const processFilesMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/admin/process-files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to process files');
      }

      return response.json();
    },
    onSuccess: (result: {
      success: boolean;
      successfulRows: number;
      failedRows: number;
      newPartners: string[];
      errors?: string[];
    }) => {
      toast.success(
        `Files processed successfully. ${result.successfulRows} rows processed, ${result.newPartners.length} new partners created.`
      );

      if (result.errors && result.errors.length > 0) {
        toast.error(
          `${result.failedRows} rows failed. Check console for details.`
        );
        console.error('Upload errors:', result.errors);
      }

      setDispatchFile(null);
      setDieselFile(null);
      setFileUploadError(null); // Clear any errors on success

      // Reset file input elements
      const dispatchInput = document.getElementById(
        'dispatchFile'
      ) as HTMLInputElement;
      const dieselInput = document.getElementById(
        'dieselFile'
      ) as HTMLInputElement;
      if (dispatchInput) dispatchInput.value = '';
      if (dieselInput) dieselInput.value = '';

      refetchStats();
      refetchPartners();
    },
    onError: (error: Error) => {
      console.log(JSON.stringify(error, null, 2));
      setFileUploadError(error.message);
      // Still show a brief toast for immediate feedback
      toast.error('File validation failed. See details below.');
    },
  });

  const handleUploadFiles = async () => {
    if (!dispatchFile && !dieselFile) {
      toast.error('Please select at least one file to upload');
      return;
    }

    try {
      const formData = new FormData();
      if (dispatchFile) {
        formData.append('dispatchFile', dispatchFile);
      }
      if (dieselFile) {
        formData.append('dieselFile', dieselFile);
      }

      await processFilesMutation.mutateAsync(formData);
    } catch (error) {}
  };

  const handleDownloadCredentials = async () => {
    if (!partners || partners.length === 0) {
      toast.error('There are no partners to export');
      return;
    }

    const XLSX = await import('xlsx');
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // Prepare data for worksheet
    const worksheetData = [];
    worksheetData.push(['Partner Name', 'Partner ID', 'Password', 'Created Date']);
    
    partners.forEach((partner: PartnerSummary) => {
      const password = temporaryPasswords[partner.id] || '[Reset password to export]';
      worksheetData.push([
        partner.name,
        partner.partnerId,
        password,
        new Date(partner.createdAt).toLocaleDateString()
      ]);
    });
    
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Partner Credentials');
    
    // Download the Excel file
    XLSX.writeFile(workbook, 'partner_credentials.xlsx');

    toast.success('Partner credentials exported to Excel file');
  };

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!userLoading && (!user || user.role !== 'admin')) {
      router.push('/auth/admin-login');
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

  // Get filtered data
  const filteredDispatchData = filterRecords(dispatchData || [], 'dispatch');
  const filteredDieselData = filterRecords(dieselData || [], 'diesel');

  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);

  const { data: supportQueries, refetch: refetchQueries } = trpc.admin.getSupportQueries.useQuery();

  const updateQueryMutation = trpc.admin.updateSupportQuery.useMutation({
    onSuccess: () => {
      toast.success('Query updated successfully');
      setShowResponseDialog(false);
      refetchQueries();
    },
    onError: (error) => {
      toast.error(`Failed to update query: ${error.message}`);
    },
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-slate-600 to-gray-700">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-foreground text-lg font-semibold">
                    Archana Admin
                  </h1>
                  <p className="text-muted-foreground text-xs">
                    Management Portal
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
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage partners, upload data, and monitor system activity
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            const url = new URL(window.location.href);
            url.searchParams.set('tab', value);
            router.replace(url.pathname + url.search);
          }}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="uploads">Data Upload</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Partners
                  </CardTitle>
                  <Users className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats?.totalPartners || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dispatch Records
                  </CardTitle>
                  <FileSpreadsheet className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats?.totalDispatchRecords || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Diesel Records
                  </CardTitle>
                  <FileSpreadsheet className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats?.totalDieselRecords || 0}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Partner Management</h3>
                <p className="text-muted-foreground">
                  Create and manage partner accounts
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleDownloadCredentials}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Excel
                </Button>
                <Dialog
                  open={showAddPartnerDialog}
                  onOpenChange={setShowAddPartnerDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Partner</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Partner</DialogTitle>
                      <DialogDescription>
                        Enter the partner name to generate credentials
                        automatically.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...addPartnerForm}>
                      <form
                        onSubmit={addPartnerForm.handleSubmit(
                          handleCreatePartner
                        )}
                        className="space-y-4"
                      >
                        <FormField
                          control={addPartnerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Partner Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter partner name"
                                  disabled={createPartnerMutation.isPending}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddPartnerDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={createPartnerMutation.isPending}
                          >
                            {createPartnerMutation.isPending
                              ? 'Creating...'
                              : 'Create Partner'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner Name</TableHead>
                      <TableHead>Partner ID</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnersLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="py-8 text-center">
                          Loading partners...
                        </TableCell>
                      </TableRow>
                    ) : !partners?.length ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-muted-foreground py-8 text-center"
                        >
                          No partners found
                        </TableCell>
                      </TableRow>
                    ) : (
                      partners.map((partner: PartnerSummary) => (
                        <TableRow key={partner.id}>
                          <TableCell className="font-medium">
                            {partner.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{partner.partnerId}</Badge>
                          </TableCell>
                          <TableCell className="font-mono">
                            {temporaryPasswords[partner.id] ? (
                              <span className="text-green-600">Available</span>
                            ) : (
                              <span className="text-gray-400">••••••••</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(partner.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {partner.lastLogin
                              ? new Date(partner.lastLogin).toLocaleDateString()
                              : 'Never'}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyCredentials(partner)}
                                className={`${
                                  temporaryPasswords[partner.id]
                                    ? 'text-blue-600 hover:text-blue-900'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                                title={
                                  temporaryPasswords[partner.id]
                                    ? 'Copy credentials'
                                    : 'Reset password first to copy'
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleResetPasswordClick(partner)
                                }
                                className="text-yellow-600 hover:text-yellow-900"
                                disabled={resetPasswordMutation.isPending}
                                title="Reset password"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleDeletePartnerClick(partner)
                                }
                                className="text-red-600 hover:text-red-900"
                                disabled={deletePartnerMutation.isPending}
                                title="Delete partner"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Upload Tab */}
          <TabsContent value="uploads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Excel Files</CardTitle>
                <CardDescription>
                  Upload dispatch and diesel data Excel files to process partner data
                </CardDescription>
                {/* Removed File Format Requirements and notes as per user request */}
              </CardHeader>
              <CardContent>
                {fileUploadError && (
                  <Alert variant="destructive" className="mb-6 relative">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="ml-2 pr-8 text-sm">
                      <strong>Validation Error:</strong>
                      <div className="mt-2 whitespace-pre-wrap">{fileUploadError}</div>
                    </AlertDescription>
                    <button
                      onClick={() => setFileUploadError(null)}
                      className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label="Dismiss error"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Alert>
                )}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Dispatch Data
                    </label>
                    <div className="hover:border-primary rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors">
                      <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-600">
                        {dispatchFile
                          ? dispatchFile.name
                          : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Excel files (.xlsx, .xls)
                      </p>
                      <Input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) => handleFileUpload(e, 'dispatch')}
                        className="hidden"
                        id="dispatchFile"
                      />
                      <Button
                        onClick={() =>
                          document.getElementById('dispatchFile')?.click()
                        }
                        className="mt-2"
                        variant="outline"
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Diesel Data
                    </label>
                    <div className="hover:border-primary rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors">
                      <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-600">
                        {dieselFile
                          ? dieselFile.name
                          : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Excel files (.xlsx, .xls)
                      </p>
                      <Input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) => handleFileUpload(e, 'diesel')}
                        className="hidden"
                        id="dieselFile"
                      />
                      <Button
                        onClick={() =>
                          document.getElementById('dieselFile')?.click()
                        }
                        className="mt-2"
                        variant="outline"
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleUploadFiles}
                    disabled={
                      (!dispatchFile && !dieselFile) ||
                      processFilesMutation.isPending
                    }
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {processFilesMutation.isPending
                      ? 'Processing...'
                      : 'Process Files'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Management Tab */}
          <TabsContent value="data" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Data Management</h3>
                <p className="text-muted-foreground">
                  View, edit, and manage dispatch and diesel records
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setClearAllDataDialogOpen(true)}
                className="bg-red-600 hover:bg-red-700"
              >
                Clear All Data
              </Button>
            </div>

            {/* Search and Filter Section */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Search</Label>
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label>Date Range</Label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="thisMonth">This Month</SelectItem>
                        <SelectItem value="lastMonth">Last Month</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {dateFilter === 'custom' && (
                    <>
                      <div className="flex flex-col space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="dispatch" className="space-y-4">
              <TabsList>
                <TabsTrigger value="dispatch">
                  Dispatch Data ({filteredDispatchData?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="diesel">
                  Diesel Data ({filteredDieselData?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dispatch">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Dispatch Records</CardTitle>
                    <Button onClick={() => handleAddRecord('dispatch')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Record
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Material</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredDispatchData?.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-4">
                                No records found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredDispatchData?.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                <TableCell>{record.vehicleNumber}</TableCell>
                                <TableCell>{record.material}</TableCell>
                                <TableCell>{record.quantity}</TableCell>
                                <TableCell>{record.destination}</TableCell>
                                <TableCell>{record.ownerName}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditRecord('dispatch', record)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteRecord('dispatch', record)}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="diesel">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Diesel Records</CardTitle>
                    <Button onClick={() => handleAddRecord('diesel')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Record
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Volume</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Fuel Station</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredDieselData?.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-4">
                                No records found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredDieselData?.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                <TableCell>{record.vehicleNumber}</TableCell>
                                <TableCell>{record.volume}</TableCell>
                                <TableCell>{record.item}</TableCell>
                                <TableCell>{record.fuelStation}</TableCell>
                                <TableCell>{record.status}</TableCell>
                                <TableCell>{record.ownerName}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditRecord('diesel', record)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteRecord('diesel', record)}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                </div>
              </CardContent>
            </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Support Queries</h3>
                <p className="text-muted-foreground">
                  Manage and respond to partner support queries
                </p>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportQueries?.map((query) => (
                      <TableRow key={query.id}>
                        <TableCell>
                          {new Date(query.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{query.partner.name}</TableCell>
                        <TableCell>{query.subject}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              query.priority === 'high'
                                ? 'destructive'
                                : query.priority === 'normal'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {query.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              query.status === 'resolved'
                                ? 'default'
                                : query.status === 'in_progress'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {query.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedQuery(query);
                              setShowResponseDialog(true);
                            }}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Record Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedRecord ? 'Edit' : 'Add'} {recordType === 'dispatch' ? 'Dispatch' : 'Diesel'} Record
            </DialogTitle>
          </DialogHeader>
          <Form {...recordForm}>
            <form onSubmit={recordForm.handleSubmit(handleRecordSubmit)} className="space-y-4">
              <FormField
                control={recordForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={recordForm.control}
                name="vehicleNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter vehicle number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {recordType === 'dispatch' ? (
                <>
                  <FormField
                    control={recordForm.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter material" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={recordForm.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="Enter quantity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={recordForm.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter destination" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={recordForm.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="Enter volume" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={recordForm.control}
                    name="item"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter item" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={recordForm.control}
                    name="fuelStation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Station</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter fuel station" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={recordForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={recordForm.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter owner name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedRecord ? 'Update' : 'Add'} Record
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={resetPasswordDialogOpen}
        onOpenChange={setResetPasswordDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Password</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset the password for{' '}
              <strong>{partnerToReset?.name}</strong> (ID:{' '}
              {partnerToReset?.partnerId})?
              <br />
              <br />
              This action will generate a new password and invalidate the
              current one. The partner will need to use the new password to log
              in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setResetPasswordDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmResetPassword}
              disabled={resetPasswordMutation.isPending}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {resetPasswordMutation.isPending
                ? 'Resetting...'
                : 'Reset Password'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Partner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <strong>{partnerToDelete?.name}</strong> (ID:{' '}
              {partnerToDelete?.partnerId})?
              <br />
              <br />
              This action cannot be undone. All data associated with this
              partner will be permanently removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeletePartner}
              disabled={deletePartnerMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletePartnerMutation.isPending
                ? 'Deleting...'
                : 'Delete Partner'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Record Confirmation Dialog */}
      <AlertDialog open={recordDeleteDialogOpen} onOpenChange={setRecordDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRecordDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Data Confirmation Dialog */}
      <AlertDialog open={clearAllDataDialogOpen} onOpenChange={setClearAllDataDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Data</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all data? This will:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Delete all partners and their credentials</li>
                <li>Delete all dispatch records</li>
                <li>Delete all diesel records</li>
              </ul>
              <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-md">
                ⚠️ This action cannot be undone. All data will be permanently deleted.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setClearAllDataDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => clearAllDataMutation.mutate()}
              disabled={clearAllDataMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {clearAllDataMutation.isPending ? 'Clearing...' : 'Clear All Data'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Response Dialog */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Respond to Query</DialogTitle>
            <DialogDescription>
              Update the status and provide a response to the partner's query.
            </DialogDescription>
          </DialogHeader>
          {selectedQuery && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Query Details</h4>
                <p className="text-sm text-gray-500 mt-1">{selectedQuery.message}</p>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={selectedQuery.status}
                  onValueChange={(value) =>
                    setSelectedQuery({
                      ...selectedQuery,
                      status: value as 'pending' | 'in_progress' | 'resolved',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Response</Label>
                <Textarea
                  value={selectedQuery.response || ''}
                  onChange={(e) =>
                    setSelectedQuery({
                      ...selectedQuery,
                      response: e.target.value,
                    })
                  }
                  placeholder="Type your response here..."
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowResponseDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateQueryMutation.mutate({
                      queryId: selectedQuery.id,
                      status: selectedQuery.status,
                      response: selectedQuery.response || undefined,
                    });
                  }}
                  disabled={updateQueryMutation.isPending}
                >
                  {updateQueryMutation.isPending ? 'Saving...' : 'Save Response'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
