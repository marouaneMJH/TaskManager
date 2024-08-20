// "user client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import { Navigate } from "react-router-dom";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import User from "@/Interfaces/User";

const signUpSchema = z
    .object({
        fullName: z
            .string()
            .min(2, "Full name must be at least 2 characters long")
            .max(50, "Full name must not exceed 50 characters")
            .regex(
                /^[a-zA-Z\s'-]+$/,
                "Full name can only contain letters, spaces, hyphens, and apostrophes"
            ),
        userName: z
            .string()
            .min(3, "Username must be at least 3 characters long"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

const SignUp = () => {
    const [submit, setSubmit] = useState<boolean>(false);
    const [signUpData, setSignUpData] = useState<User>();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            userName: "",
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        const registerUser = async () => {
            if (form.formState.isValid) {
                //pop-up
                await axios.post("/auth/register", signUpData);
            }
        };

        registerUser();
    }, [submit]);

    //for split the full name to fist name and last name
    function splitAtFirstSpace(input: string): [string, string] {
        const index = input.indexOf(" ");
        if (index === -1) {
            return [input, ""];
        }
        return [input.slice(0, index), input.slice(index + 1)];
    }

    function onSubmit(values: z.infer<typeof signUpSchema>) {
        setSubmit(true);
        setSignUpData({
            username: values.userName,
            firstName: splitAtFirstSpace(values.fullName)[0],
            lastName: splitAtFirstSpace(values.fullName)[1],
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
            
        });
    }

    return (
        <>
            {submit ? (
                <Navigate to="/dash-board" replace />
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="max-w-sm max-h-xs w-full bg-green backdrop-blur p-4 rounded-[8px] border border-green flex flex-col gap-2 "
                    >
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="User name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        style={{
                                            marginTop: "0",
                                        }}
                                    >
                                        Full name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your full name."
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your personal email."
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
                                        <Input
                                            type="password"
                                            placeholder="Enter the password here."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>confirmPassword</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="confirm your password "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            )}
        </>
    );
};

export default SignUp;
