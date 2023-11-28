"use client";

import { useTransition } from "react";
import { Register } from "@/actions";
import { useRouter } from "next/navigation";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const { success, message } = await Register(data);
      if (!success) toast.error(message);
      if (success) router.replace("/login");
    });
  };

  const schema: ZodType<FormData> = z
    .object({
      name: z.string().max(80),
      username: z
        .string()
        .min(4)
        .max(22)
        .regex(/^[a-z0-9]+$/, {
          message:
            "Username must not contain spaces/symbols, and must be in lowercase",
        }),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Password do not match!",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full max-sm:p-3 md:max-w-xs">
      <input
        type="text"
        autoFocus
        required
        placeholder="Name"
        maxLength={80}
        className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white"
        {...register("name")}
      />

      <div className="space-y-2">
        <input
          type="text"
          minLength={4}
          maxLength={22}
          required
          placeholder="Username"
          className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white placeholder:capitalize"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="password"
          minLength={8}
          required
          placeholder="Password"
          className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="password"
          minLength={8}
          required
          placeholder="Confirm Password"
          className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 w-full rounded-md py-1 text-white flex items-center justify-center disabled:bg-blue-400">
        {isPending ? (
          <BiLoaderAlt size={24} className="animate-spin" />
        ) : (
          "Sign up"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
