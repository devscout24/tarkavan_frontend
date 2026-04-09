import React from "react"
import CommonBtn from "@/components/common/common-btn"

const ConfirmPayModal = () => {
  const orderDetails = {
    service: "1-on-1 Private Training",
    programFee: "$299.00",
    hst: "$38.87",
    total: "$337.87"
  }

  const handleConfirmPay = () => {
    console.log("Payment confirmed:", orderDetails)
    // Handle payment logic here
  }

  const handleCancel = () => {
    console.log("Payment cancelled")
    // Handle cancel logic here
  }

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-6 rounded-2xl bg-neutral-900 p-8 text-white">
        {/* Header */}
        <h2 
          className="text-2xl font-bold"
          style={{
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%",
            color: "white"
          }}
        >
          Confirm & Pay
        </h2>

        <div className="border-t border-neutral-600"></div>

        {/* Order Summary Section */}
        <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-6">
          <h3 
            className="mb-4 text-lg font-semibold"
            style={{
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150%",
              color: "white"
            }}
          >
            Order Summary
          </h3>

          {/* Order Items */}
          <div className="space-y-3">
            {/* Service Row */}
            <div className="flex justify-between items-center">
              <span 
                style={{
                  color: "#FFF",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "171.429%"
                }}
              >
                Service
              </span>
              <span 
                style={{
                  color: "#FFF",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "171.429%"
                }}
              >
                {orderDetails.service}
              </span>
            </div>

            {/* Divider */}
            

            {/* Program Fee Row */}
            <div className="flex justify-between items-center">
              <span 
                style={{
                  color: "#FFF",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "171.429%"
                }}
              >
                Program Fee
              </span>
              <span 
                style={{
                  color: "#FFF",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "171.429%"
                }}
              >
                {orderDetails.programFee}
              </span>
            </div>

            {/* HST Row */}
            <div className="flex justify-between items-center">
              <span 
                style={{
                  color: "#FFF",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "171.429%"
                }}
              >
                HST (13%)
              </span>
              <span 
                style={{
                  color: "#FFF",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "171.429%"
                }}
              >
                {orderDetails.hst}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-600"></div>

            {/* Total Row */}
            <div className="flex justify-between items-center">
              <span 
                className="font-semibold"
                style={{
                  color: "#C6F57A",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "150%"
                }}
              >
                Total
              </span>
              <span 
                className="font-semibold"
                style={{
                  color: "#C6F57A",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "150%"
                }}
              >
                {orderDetails.total}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <CommonBtn
            text="Cancel"
            size="lg"
            variant="outline"
            className="w-1/2 border-neutral-700 bg-transparent text-white hover:border-neutral-600 hover:bg-neutral-800"
            onClick={handleCancel}
          />
          <CommonBtn
            text="Confirm & Pay"
            size="lg"
            variant="default"
            className="w-1/2 bg-brand text-black hover:bg-brand/90 border-brand hover:border-brand/90"
            onClick={handleConfirmPay}
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmPayModal
