"use client";

import { Button, buttonVariants } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Icons } from "@/src/components/Icons";
import { cn } from "@/src/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    TAuthCredentialValidator,
    AuthCredentialValidator,
} from "@/src/lib/validators/account-credentials-validators";
import { trpc } from "@/src/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod"
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialValidator>({
        resolver: zodResolver(AuthCredentialValidator),
    });

    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get("origin")

    const { mutate, isLoading } = trpc.auth.signIn.useMutation({
        onSuccess: () => {
          toast.success("Signed in successfully")

          router.refresh()

          if(origin) {
            router.push(`/${origin}`)
            return
          }

          router.push("/")
        },
        onError: (err) => {
          if (err.data?.code === "UNAUTHORIZED") {
            toast.error("Invalid email or password.")
          }
        }
    });

    const onSubmit = ({ email, password }: TAuthCredentialValidator) => {
        mutate({ email, password });
    };

    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20" />
                        <h1 className="text-2xl font-bold">
                            Sign in to your account
                        </h1>
                        <Link
                            href="/sign-up"
                            className={buttonVariants({
                                variant: "link",
                                className: "gap-1.5",
                            })}
                        >
                            Dont&apos;t have an account? 
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...register("email")}
                                        className={cn({
                                            "focus-visible:ring-red-500":
                                                errors.email,
                                        })}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        className={cn({
                                            "focus-visible:ring-red-500":
                                                errors.password,
                                        })}
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password.message}</p>
                                    )}
                                </div>
                                <Button>Sign In</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
