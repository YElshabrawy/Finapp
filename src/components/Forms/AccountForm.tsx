"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  balance: z.coerce.number().min(0, "Balance must be positive"),
});

export default function AccountForm() {
  const { toast } = useToast();
  const { mutate, isPending } = api.account.create.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Account created! 🎉",
        description: "Your account has been created successfully.",
      });
    },
    onError: (error) => {
      form.setError("name", {
        type: "manual",
        message: error.message,
      });
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    },
    onSettled: () => {
      form.reset();
    },
  });
  const { data } = api.account.getAll.useQuery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      balance: 0,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate({
      name: values.name,
      balance: values.balance,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormDescription>This is your account name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>
                This is your account balance in EGP
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
        </Button>
      </form>
      <ul>
        {data?.map((account) => (
          <li key={account.id}>
            {account.name} {account.balance}
          </li>
        ))}
      </ul>
    </Form>
  );
}
