"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  date: string;
  amount: number;
  account: string;
  notes?: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "account",
    header: "Account",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EGP",
        signDisplay: "never",
      }).format(amount);

      return (
        <div
          className={cn(
            "font-medium",
            amount < 0 ? "text-red-500" : "text-green-500",
          )}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
