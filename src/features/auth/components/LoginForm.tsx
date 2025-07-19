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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

// Import schemas from centralized location instead of duplicating
import { loginSchema, partnerLoginSchema } from '@/config/db/schema';

// Create type-safe aliases for better readability
const adminLoginSchema = loginSchema;
const partnerLoginFormSchema = partnerLoginSchema;

type AdminLoginData = z.infer<typeof adminLoginSchema>;
type PartnerLoginData = z.infer<typeof partnerLoginSchema>;

interface LoginFormProps {
  type: 'admin' | 'partner';
  onSubmit: (data: AdminLoginData | PartnerLoginData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function LoginForm({
  type,
  onSubmit,
  isLoading = false,
  error,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const schema = type === 'admin' ? adminLoginSchema : partnerLoginFormSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues:
      type === 'admin'
        ? { username: '', password: '' }
        : { partnerId: '', password: '' },
  });

  const {
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = form;

  const watchedValues = watch();

  const handleFormSubmit = async (data: AdminLoginData | PartnerLoginData) => {
    try {
      await onSubmit(data);
      reset(); // Clear form on successful submission
    } catch (error) {
      // Error handling is done in parent component
      console.error('Login form submission error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          {type === 'admin' ? 'Admin Login' : 'Partner Login'}
        </CardTitle>
        <CardDescription className="text-center">
          {type === 'admin'
            ? 'Enter your admin credentials to access the dashboard'
            : 'Enter your partner credentials to access your data'}
        </CardDescription>
      </CardHeader>

      <CardContent>
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
              name={type === 'admin' ? 'username' : 'partnerId'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {type === 'admin' ? 'Username' : 'Partner ID'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={
                        type === 'admin' ? 'Enter username' : 'e.g., JD1234'
                      }
                      autoComplete={type === 'admin' ? 'username' : 'off'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isSubmitting || !isValid}
            >
              {isLoading || isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>

        {/* Enhanced development helper */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 rounded bg-gray-100 p-2 text-xs">
            <p className="font-semibold">Form State (Dev Only):</p>
            <p>Valid: {isValid ? '✅' : '❌'}</p>
            <p>Errors: {Object.keys(errors).join(', ') || 'None'}</p>
            <p>Type: {type}</p>
            <details className="mt-1">
              <summary className="cursor-pointer">Current Values</summary>
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

// Export schemas for use in other components
export { adminLoginSchema, partnerLoginSchema };
export type { AdminLoginData, PartnerLoginData };
