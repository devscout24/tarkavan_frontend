import StatCard from "@/components/common/stat-card"
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { CiWallet } from "react-icons/ci"; 
import PaymentTable from "../components/payment-table";




export default function PaymentPage() {
  const paymentStats = [
    {
      icon: <FaRegCreditCard className="w-5 h-5 "/>,
      title: "Total Paid",
      value: "$696.11",
    },
    {
      icon: <MdOutlinePending className="w-5 h-5 "/>, 
      title: "Pending Payments",
      value: "$224.87",
    },
    {
      icon: <MdOutlinePending className="w-5 h-5 "/>, 
      title: "Pending Payments",
      value: "$124.87",
    },
    {
      icon: <CiWallet className="w-5 h-5 "/>, 
      title: "Total Transactions",
      value: "05",
    },
  ]

  return (
    <section>
      {/* stats */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paymentStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            text={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>


       {/* payment table */}
       <PaymentTable />

    </section>
  )
}
