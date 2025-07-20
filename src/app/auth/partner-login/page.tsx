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
  });

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

  const utils = trpc.useUtils();
  const loginMutation = trpc.auth.partnerLogin.useMutation({
    onSuccess: (data) => {
      console.log('✅ Partner login successful:', data);
      toast.success(`Welcome back, ${data.user?.name || 'Partner'}`);
      
      // Force a small delay to ensure session is set
      setTimeout(() => {
        // Invalidate auth queries to update state immediately
        utils.auth.getUser.invalidate();
        utils.auth.checkAuth.invalidate();
        
        // Use replace to prevent back navigation to login
        console.log('🔄 Redirecting to partner dashboard...');
        router.replace('/partner/dashboard');
      }, 500);
    },
    onError: (error) => {
      console.error('❌ Partner login error:', error);
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
          onClick={() => router.push('/')}
          className="mb-4 flex items-center space-x-2 hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
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
            <div className="mt-2 text-xs text-red-600 font-medium">
              PARTNER PORTAL - TRANSPORT DATA ACCESS
            </div>
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
                
                {loginMutation.isPending && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-red-600">
                      Please wait while we authenticate you...
                    </p>
                  </div>
                )}
              </form>
            </Form>

            <div className="mt-6 rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-800">
                <strong>Need help?</strong> Contact your administrator for your
                Partner ID and password.
              </p>
            </div>
            
            {/* Navigation to other login */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 mb-2">Need admin access?</p>
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push('/auth/admin-login')}
                className="text-xs text-slate-600 hover:text-slate-800"
              >
                Go to Admin Login →
              </Button>
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
