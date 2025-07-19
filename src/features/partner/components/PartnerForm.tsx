'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Loader2, User, Plus } from 'lucide-react';

// Common validation utilities
const validationUtils = {
  email: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'Please enter a valid email address',
    }),
  phone: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: 'Please enter a valid phone number',
    }),
  partnerName: z
    .string()
    .min(1, 'Partner name is required')
    .min(2, 'Partner name must be at least 2 characters')
    .max(100, 'Partner name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s\.]+$/,
      'Partner name can only contain letters, spaces, and periods'
    )
    .transform((val) => val.trim().replace(/\s+/g, ' ')), // Normalize whitespace
};

// Enhanced partner creation schema using reusable validations
const createPartnerSchema = z.object({
  name: validationUtils.partnerName,
  email: validationUtils.email,
  phone: validationUtils.phone,
});

type CreatePartnerData = z.infer<typeof createPartnerSchema>;

interface PartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePartnerData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  title?: string;
  description?: string;
}

export function PartnerForm({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error,
  title = 'Create New Partner',
  description = 'Enter the partner details to generate credentials automatically.',
}: PartnerFormProps) {
  const form = useForm<CreatePartnerData>({
    resolver: zodResolver(createPartnerSchema),
    mode: 'onChange', // Real-time validation for better UX
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const {
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = form;

  const watchedValues = watch();

  const handleFormSubmit = async (data: CreatePartnerData) => {
    try {
      await onSubmit(data);
      reset(); // Clear form on successful submission
      onClose(); // Close dialog
    } catch (error) {
      // Error handling is done in parent component
      console.error('Partner form submission error:', error);
    }
  };

  const handleClose = () => {
    reset(); // Clear form when closing
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Partner Name *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter partner name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Email (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="partner@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Enhanced form validation feedback */}
            {Object.keys(errors).length === 0 && watchedValues.name && (
              <Alert>
                <AlertDescription className="text-green-600">
                  ✅ Partner information is valid. Ready to create account.
                </AlertDescription>
              </Alert>
            )}

            {/* Show validation progress */}
            {watchedValues.name && Object.keys(errors).length > 0 && (
              <Alert variant="destructive">
                <AlertDescription>
                  Please fix {Object.keys(errors).length} validation error
                  {Object.keys(errors).length > 1 ? 's' : ''} above.
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading || isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || isSubmitting || !isValid}
                className="min-w-[120px]"
              >
                {isLoading || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Partner
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>

        {/* Development helper */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 rounded bg-gray-100 p-2 text-xs">
            <p className="font-semibold">Form State (Dev Only):</p>
            <p>Valid: {isValid ? '✅' : '❌'}</p>
            <p>Errors: {Object.keys(errors).join(', ') || 'None'}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Export schema for use in other components
export { createPartnerSchema };
export type { CreatePartnerData };
