// "use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, Navigate } from "react-router-dom";
import axios from "@/api/axios";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
});

const SignIn = () => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [redirectTo, setRedirectTo] = useState<string>("auth/sign-in");
    const [redirect, setRedirect] = useState<boolean>(false);
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
    }>({ email: "", password: "" });

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        // async function postData() {
        //     console.log(formData);
        //     if (submitted) {
        //         try {
        //             const result =await axios.post("/auth/sign-in", formData);
        //             setRedirectTo(result.data);
        //             setRedirect(true);
        //             setSubmitted(false);
        //         } catch (err) {
        //             console.error("Error");
        //         }
        //     }
        // }
        // postData();
        (async () => {
            if (submitted) {
                try {
                    const result = await axios.post("/auth/sign-in", formData);
                    setRedirectTo(result.data);
                    setRedirect(true);
                    // setSubmitted(false);
                    console.log("submited after send the request")
                } catch (err) {
                    console.error("Error");
                }
            }
        })();
    }, [submitted]);

    function onSubmit(values: z.infer<typeof signInSchema>) {
        setFormData({
            email: values.email,
            password: values.password,
        });
        console.log("submitted");
        setSubmitted(true);
    }

    if (redirect) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-md w-full bg-green backdrop-blur p-6 rounded-[12px] border border-green"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-5">
                    Sign In
                </Button>

                <div className="mt-4 text-center">
                    <Link
                        to="/sign-up"
                        className="text-blue-600 hover:underline"
                    >
                        Don't have an account? Sign Up
                    </Link>
                    <br />
                    <Link
                        to="/forgot-password"
                        className="text-blue-600 hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default SignIn;
