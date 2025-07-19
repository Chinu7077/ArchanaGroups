'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import {
  Copy,
  RefreshCw,
  Trash2,
  MoreHorizontal,
  UserCheck,
  UserX,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/shared/components/ui/skeleton';

interface Partner {
  id: string;
  name: string;
  partnerId: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  password?: string;
}

interface PartnersTableProps {
  partners: Partner[] | undefined;
  isLoading: boolean;
  onResetPassword: (partnerId: string) => void;
  onDeletePartner: (partnerId: string) => void;
  onToggleStatus: (partnerId: string, isActive: boolean) => void;
  isResetting: boolean;
  isDeleting: boolean;
  className?: string;
}

export function PartnersTable({
  partners,
  isLoading,
  onResetPassword,
  onDeletePartner,
  onToggleStatus,
  isResetting,
  isDeleting,
  className,
}: PartnersTableProps) {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [partnerToReset, setPartnerToReset] = useState<Partner | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);

  const handleResetPasswordClick = (partner: Partner) => {
    setPartnerToReset(partner);
    setResetPasswordDialogOpen(true);
  };

  const handleConfirmResetPassword = () => {
    if (partnerToReset) {
      onResetPassword(partnerToReset.id);
      setResetPasswordDialogOpen(false);
      setPartnerToReset(null);
    }
  };

  const handleDeletePartnerClick = (partner: Partner) => {
    setPartnerToDelete(partner);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDeletePartner = () => {
    if (partnerToDelete) {
      onDeletePartner(partnerToDelete.id);
      setDeleteDialogOpen(false);
      setPartnerToDelete(null);
    }
  };

  const handleCopyCredentials = (partnerId: string, password?: string) => {
    if (!password) {
      toast.error('Please reset the password first to copy credentials');
      return;
    }
    const credentials = `Partner ID: ${partnerId}\nPassword: ${password}`;
    navigator.clipboard.writeText(credentials);
    toast.success('Partner credentials have been copied to clipboard');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatLastLogin = (dateString: string | undefined) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(dateString);
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-0">
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!partners?.length) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <UserX className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h3 className="text-muted-foreground mb-2 text-lg font-semibold">
            No Partners Found
          </h3>
          <p className="text-muted-foreground text-sm">
            Get started by creating your first partner account.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner Details</TableHead>
                <TableHead>Partner ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                          <UserCheck className="text-primary h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <p className="text-foreground font-medium">
                          {partner.name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          ID: {partner.partnerId}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {partner.partnerId}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      {partner.email && (
                        <div className="text-muted-foreground flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3" />
                          {partner.email}
                        </div>
                      )}
                      {partner.phone && (
                        <div className="text-muted-foreground flex items-center text-sm">
                          <Phone className="mr-1 h-3 w-3" />
                          {partner.phone}
                        </div>
                      )}
                      {!partner.email && !partner.phone && (
                        <span className="text-muted-foreground text-sm">
                          No contact info
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={partner.isActive ? 'default' : 'secondary'}
                      className={
                        partner.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {partner.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="text-muted-foreground flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(partner.createdAt)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`text-sm ${
                        partner.lastLogin
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formatLastLogin(partner.lastLogin)}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() =>
                            handleCopyCredentials(
                              partner.partnerId,
                              partner.password
                            )
                          }
                          className="cursor-pointer"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Credentials
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleResetPasswordClick(partner)}
                          disabled={isResetting}
                          className="cursor-pointer"
                        >
                          <RefreshCw
                            className={`mr-2 h-4 w-4 ${isResetting ? 'animate-spin' : ''}`}
                          />
                          Reset Password
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            onToggleStatus(partner.id, !partner.isActive)
                          }
                          className="cursor-pointer"
                        >
                          {partner.isActive ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDeletePartnerClick(partner)}
                          disabled={isDeleting}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Partner
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

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
              disabled={isResetting}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isResetting ? 'Resetting...' : 'Reset Password'}
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
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete Partner'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
