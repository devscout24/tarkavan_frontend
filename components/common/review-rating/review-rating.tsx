"use client"

import { useEffect, useState } from "react"
import styles from "./rating.module.css"
import { toast } from "sonner"
import { RatingReview } from "@/app/(dashboards)/player/upcoming-events/action"
import { Button } from "@/components/ui/button"
import { LuLoaderCircle } from "react-icons/lu"

const RATINGS = [
  { value: 1, label: "Terrible" },
  { value: 2, label: "Bad" },
  { value: 3, label: "Okay" },
  { value: 4, label: "Good" },
  { value: 5, label: "Excellent" },
]

export default function Rating( ) {
  const [rating, setRating] = useState<number | null>(null)
  const [label, setLabel] = useState<string>("click on a star to rate")
  const [reviewText, setReviewText] = useState<string>("")
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [user, setUser] = useState<{
    id: string
    name: string
    profile_id: string
  } | null>(null)
  useEffect(() => {
    const userData = localStorage.getItem("go_elite_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
 

  const handleReview = async () => {
    if (!user || !user?.id) {
      toast.error("Please login to submit a review")
      return
    }

    if (!rating) {
      toast.error("Please provide a rating")
      return
    }

    if (!reviewText.trim()) {
      toast.error("Please write a review")
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("rating", String(rating))
      formData.append("review", reviewText)
      // formData.append("coach_club", String(coach_or_club_id))

      const res = await RatingReview(user?.id, formData)
      console.log("RatingReview", res)
      if (res && "success" in res && res.success && "data" in res) {
        const { status, message } = res.data

        if (status) {
          // window.dispatchEvent(new Event("programevent"))
          toast.success(message || "Review submitted successfully!")
          setSubmitting(false)
        } else {
          setSubmitting(false)
          toast.error(message || "Already reviewed or failed")
        }
      }
    } catch (err) {
      console.error("Failed to submit review:", err)
      setSubmitting(false)
    } finally {
      setSubmitting(false)
      setRating(null)
      setLabel("click on a star to rate")
      setReviewText("")
    }
  }

  return (
    <div className={styles.outer}>
      <div className="">
        <h2 className="mb-10 pb-3 font-bold text-white">
          How would you rate your experience?
        </h2>

        <div className="text-center">
          <p className={`h-10`}>{label}</p>
        </div>

        <div className="mb-10 flex w-full items-center justify-center">
          <div className={styles.ratingsBox}>
            {RATINGS.map((item) => {
              const isSelected = rating === item.value
              const isFilled = rating !== null && item.value <= rating

              return (
                <div key={item.value} className={styles.ratingItem}>
                  <label className={styles.label}>
                    <input
                      type="radio"
                      name="rating"
                      value={item.value}
                      checked={isSelected}
                      onChange={() => {
                        setRating(item.value)
                        setLabel(item.label)
                      }}
                      className={styles.input}
                    />

                    <div
                      className={`${styles.starLineBox} ${
                        isSelected ? styles.selected : ""
                      }`}
                    >
                      {/* Main star */}
                      <span className={styles.ratingStar}>
                        {/* Inner star */}
                        <span
                          className={`${styles.innerStar} ${
                            isFilled ? styles.filled : ""
                          }`}
                        />
                      </span>

                      {/* Spark lines */}
                      <span className={styles.ratingStarLine} />
                      <span className={styles.ratingStarLine} />
                      <span className={styles.ratingStarLine} />
                    </div>
                  </label>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.reviewText}>
          <div className={styles.reviewHeader}>
            <div className={`text-white`}>
              <h3>Tell us more,</h3>
              <p className="text-sm">
                Your feedback helps us improve your experience.
              </p>
            </div>
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setReviewText(e.target.value)
              }
            }}
            placeholder="Share your experience..."
            maxLength={500}
          />
          <span className={`text-sx mt-1 text-brand`}>
            You feedback limit : {reviewText.length}/500
          </span>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2"> 
          <Button
            disabled={submitting}
            onClick={handleReview}
            className="flex cursor-pointer items-center gap-2 bg-brand text-primary"
          >
            {submitting && <LuLoaderCircle className="animate-spin" />}
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
