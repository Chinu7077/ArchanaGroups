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
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trpc } from '@/config/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// Define Zod schemas
const addPartnerSchema = z.object({
  name: z
    .string()
    .min(1, 'Partner name is required')
    .min(2, 'Partner name must be at least 2 characters')
    .max(100, 'Partner name must be less than 100 characters'),
});

type AddPartnerFormData = z.infer<typeof addPartnerSchema>;

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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl">
                Admin Dashboard
              </h2>
              <p className="text-muted-foreground">
                Manage partners, upload data, and monitor system activity
              </p>
            </div>
            <Link href="/admin/data-management">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Data Management
              </Button>
            </Link>
          </div>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="uploads">Data Upload</TabsTrigger>
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
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 font-semibold text-blue-900">File Format Requirements:</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <h5 className="mb-1 font-medium text-blue-800">Dispatch Data Format:</h5>
                        <p className="text-sm text-blue-700">
                          Columns: Date, Vehicle No, Material, Quantity, Destination, Owner Name
                        </p>
                      </div>
                      <div>
                        <h5 className="mb-1 font-medium text-blue-800">Diesel Data Format:</h5>
                        <p className="text-sm text-blue-700">
                          Columns: Date, Vehicle No, Volume, Item, Fuel Station, Status, Owner Name
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Note: Owner Name will automatically create new partners if they don't exist. Diesel data can be uploaded independently.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
        </Tabs>
      </div>

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
    </div>
  );
};

export default AdminDashboard;
