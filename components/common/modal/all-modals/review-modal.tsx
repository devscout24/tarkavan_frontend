import React, { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import CommonBtn from "@/components/common/common-btn"
import { Icon } from "@/components/custom/Icon"

const ReviewModal = () => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1)
  }

  const handleSubmit = () => {
    // Handle submit logic here 
  }

  const handleCancel = () => {
    // Handle cancel logic here 
  }

  const starPath = "M18.1659 11.4219L15 3.125L11.8342 11.4219L3.125 11.8478L9.72223 17.6389L7.31117 26.875L15 21.5972L22.6889 26.875L20.2778 17.6389L26.875 11.8478L18.1659 11.4219Z"

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-6 rounded-2xl bg-neutral-900 p-8 text-white">
        {/* Header */}
        <h2 
          className="text-center"
          style={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%",
            color: "white"
          }}
        >
          Write a Review
        </h2>

        {/* Rating Section */}
        <div className="flex flex-col items-center gap-3">
          <p 
            style={{
              fontSize: "16px",
              fontStyle: "normal", 
              fontWeight: 500,
              lineHeight: "150%"
            }}
          >
            Please rate this product
          </p>
          
          {/* Star Rating */}
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => handleStarClick(index)}
                className="cursor-pointer transition-transform hover:scale-110"
                aria-label={`Rate ${index + 1} stars`}
              >
                <Icon 
                  width="30" 
                  height="30" 
                  viewBox="0 0 30 30"
                  stroke={index < rating ? "#C6F57A" : "#666"}
                  fill="none"
                  strokeLinejoin="round"
                >
                  <path d={starPath} />
                </Icon>
              </button>
            ))}
          </div>
        </div>

        {/* Review Textarea */}
        <div className="flex flex-col gap-2">
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="min-h-32 border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-brand focus:ring-2 focus:ring-brand/20"
            style={{
              resize: "vertical"
            }}
          />
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
            text="Submit"
            size="lg"
            variant="default"
            className="w-1/2 bg-brand text-black hover:bg-brand/90 border-brand hover:border-brand/90"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewModal