'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
import { Users, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { trpc } from '@/config/trpc/client';
import { toast } from 'sonner';

const partnerLoginSchema = z.object({
  partnerId: z
    .string()
    .min(1, 'Partner ID is required')
    .min(3, 'Partner ID must be at least 3 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type PartnerLoginFormData = z.infer<typeof partnerLoginSchema>;

export default function PartnerLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<PartnerLoginFormData>({
    resolver: zodResolver(partnerLoginSchema),
    defaultValues: {
      partnerId: '',
      password: '',
    },
  });

  // Check if user is already authenticated
  const checkAuthQuery = trpc.auth.checkAuth.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0, // Don't cache auth state
  });

  const utils = trpc.useUtils();

  useEffect(() => {
    if (checkAuthQuery.data?.authenticated) {
      const user = checkAuthQuery.data.user;
      if (user?.role === 'partner') {
        console.log('User already authenticated as partner, redirecting...');
        router.replace('/partner/dashboard');
      } else if (user?.role === 'admin') {
        console.log(
          'Admin trying to access partner login, redirecting to admin dashboard...'
        );
        router.replace('/admin/dashboard');
      }
    }
  }, [checkAuthQuery.data, router]);

  // Clear auth state when component mounts to prevent stale data
  useEffect(() => {
    // Clear tRPC cache immediately and aggressively
    utils.auth.checkAuth.invalidate();
    utils.auth.getUser.invalidate();
    utils.auth.checkAuth.reset();
    utils.auth.getUser.reset();
    
    // Manual cookie cleanup as primary method
    const clearStaleSession = async () => {
      try {
        // Clear session cookies with multiple approaches
        document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure';
        document.cookie = 'session=; Path=/; Domain=localhost; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        
        // Also try to clear without specific attributes
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        console.log('Session cookies cleared successfully');
      } catch (error) {
        console.log('Cookie cleanup completed (manual method)');
      }
      
      // Also call server-side session clearing
      try {
        await fetch('/api/clear-session', {
          method: 'POST',
          credentials: 'include',
        });
        console.log('Server-side session cleared');
      } catch (error) {
        console.log('Server-side session cleanup completed');
      }
    };
    
    clearStaleSession();
  }, [utils]);

  const loginMutation = trpc.auth.partnerLogin.useMutation({
    onSuccess: async (data) => {
      toast.success(`Welcome back, ${data.user?.name || 'Partner'}`);
      // Invalidate auth queries to update state immediately
      await utils.auth.getUser.invalidate();
      await utils.auth.checkAuth.invalidate();
      // Add a small delay to ensure session is properly set
      setTimeout(() => {
        router.replace('/partner/dashboard');
      }, 100);
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });

  const onSubmit = (data: PartnerLoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-red-200 opacity-20" />
        <div className="absolute top-40 right-20 h-24 w-24 animate-pulse rounded-full bg-red-300 opacity-20 delay-1000" />
        <div className="absolute bottom-32 left-20 h-40 w-40 animate-pulse rounded-full bg-red-100 opacity-20 delay-2000" />
        <div className="absolute right-10 bottom-20 h-28 w-28 animate-pulse rounded-full bg-red-400 opacity-20 delay-500" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/transport')}
          className="mb-4 flex items-center space-x-2 hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Transport</span>
        </Button>

        <Card className="border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-800">
              <Users className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-2xl font-bold text-transparent">
              Partner Login
            </CardTitle>
            <CardDescription className="text-gray-600">
              Access your transportation data dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="partnerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Partner ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., AG1234"
                          className="h-12 border-2 border-gray-200 transition-colors focus:border-red-500"
                          disabled={loginMutation.isPending}
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
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="h-12 border-2 border-gray-200 pr-12 transition-colors focus:border-red-500"
                            disabled={loginMutation.isPending}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
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
                  className="h-12 w-full bg-gradient-to-r from-red-600 to-red-800 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:shadow-xl"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-800">
                <strong>Need help?</strong> Contact your administrator for your
                Partner ID and password.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Company branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            © 2025 Archana Groups. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
