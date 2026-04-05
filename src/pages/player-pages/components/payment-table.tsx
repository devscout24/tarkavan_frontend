import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Demo Booking type
interface Booking {
  id: string
  programName: string
  childName: string
  amount: string
  hst: string
  discount: string
  total: string
  date: string
  status: number | string
}

const demoInvoices: Booking[] = [
  {
    id: "1",
    programName: "Elite Soccer Training",
    childName: "Sarah Smith",
    amount: "$299.00",
    hst: "$38.87",
    discount: "$20.00",
    total: "$317.87",
    date: "2026-04-10",
    status: "paid",
  },
  {
    id: "2",
    programName: "Advanced Basketball Camp",
    childName: "James Johnson",
    amount: "$350.00",
    hst: "$45.50",
    discount: "$0.00",
    total: "$395.50",
    date: "2026-04-12",
    status: "pending",
  },
  {
    id: "3",
    programName: "Swimming Lessons Pro",
    childName: "Emily Davis",
    amount: "$180.00",
    hst: "$23.40",
    discount: "$10.00",
    total: "$193.40",
    date: "2026-04-15",
    status: "refunded",
  },
]

export default function PaymentTable() {
  const selectItemClassName: string =
    "text-white data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary   py-2! px-4! rounded-0! "
  const columnBorderClass = "border-r border-white/15 last:border-r-0"

  return (
    <div className="mx-1 mt-6 text-white">
      <Select>
        <SelectTrigger className="h-11 w-full rounded-xl border-white/15 bg-transparent py-5 text-white!">
          <SelectValue placeholder={"All Status"} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="border-white/10 bg-secondary text-white!"
        >
          <SelectItem className={selectItemClassName} value={"all"}>
            {"All"}
          </SelectItem>
          <SelectItem className={selectItemClassName} value={"paid"}>
            {"Paid"}
          </SelectItem>
          <SelectItem className={selectItemClassName} value={"pending"}>
            {"Pending"}
          </SelectItem>
          <SelectItem className={selectItemClassName} value={"refunded"}>
            {"Refunded"}
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="mx-auto mt-4 max-w-[95vw] [&>div]:rounded-lg [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand hover:bg-brand">
              <TableHead
                className={`sticky left-0 z-10 bg-brand ${columnBorderClass}`}
              >
                Program Name
              </TableHead>
              <TableHead className={columnBorderClass}>Child</TableHead>
              <TableHead className={columnBorderClass}>Amount</TableHead>
              <TableHead className={columnBorderClass}>HST</TableHead>
              <TableHead className={columnBorderClass}>Discount</TableHead>
              <TableHead className={columnBorderClass}>Total</TableHead>
              <TableHead className={columnBorderClass}>Date</TableHead>
              <TableHead className={columnBorderClass}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-transparent border-t border-white/20">
                <TableCell
                  className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                >
                  {invoice.programName}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {invoice.childName}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {invoice.amount}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {invoice.hst}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {invoice.discount}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {invoice.total}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {invoice.date}
                </TableCell>
                <TableCell className={columnBorderClass}>
                  {invoice.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
