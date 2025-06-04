"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// 1. Define your form schema with Zod for validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Define the type for form values
type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // 2. Initialize react-hook-form with Zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Handle form submission
  const handleSubmit = (values: LoginFormValues) => {
    onSubmit(values); // Call the onSubmit prop passed from parent
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        // Responsive classes:
        // p-6: default padding for mobile
        // sm:p-8: padding 8 on small screens (e.g., tablets) and up
        // md:p-10: padding 10 on medium screens (e.g., desktops) and up
        // max-w-sm: limits max width to 384px, making it centered on larger screens
        // mx-auto: centers the form horizontally
        className="space-y-4 p-6 sm:p-6 md:p-8 border rounded-lg  max-w-sm lg:max-w-md mx-auto bg-white dark:bg-gray-800"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Login
        </h2>

        {/* Email Input Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 dark:text-gray-200">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...field}
                  className="placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Password Input Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 dark:text-gray-200">
                Password
              </FormLabel>
              <FormControl>
                {/* Wrap Input and Button in a relative div for positioning */}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"} // Dynamically set type
                    placeholder="••••••••"
                    {...field}
                    className="placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 pr-10" // Add right padding for icon
                  />
                  <Button
                    type="button" // Important: Prevent form submission
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
