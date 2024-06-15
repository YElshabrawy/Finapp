import { type Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      date: "2021-01-01",
      amount: 100,
      account: "Checking",
      notes: "Initial deposit",
    },
    {
      id: "2",
      date: "2021-01-02",
      amount: 50,
      account: "Savings",
      notes: "Deposit",
    },
    {
      id: "3",
      date: "2021-01-03",
      amount: -10,
      account: "Checking",
      notes: "Withdrawal",
    },

    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
