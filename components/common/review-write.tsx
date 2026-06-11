"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { programReview } from "@/app/(dashboards)/player/upcoming-events/action"
import CommonBtn from "./common-btn"
import { toast } from "sonner"

// ─── Types ────────────────────────────────────────────────
interface ReviewFormState {
    rating: number
    body: string
}

const INITIAL_FORM: ReviewFormState = {
    rating: 0,
    body: "",
}

// ─── Star Rating ──────────────────────────────────────────
function StarRating({
    value,
    onChange,
}: {
    value: number
    onChange: (val: number) => void
}) {
    const [hovered, setHovered] = useState(0)



    return (
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110"
                >
                    <Star
                        className={`h-7 w-7 transition-colors ${star <= (hovered || value)
                            ? "fill-brand text-brand"
                            : "text-zinc-600"
                            }`}
                    />
                </button>
            ))}
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────
export function WriteReviewDialog({ trigger, program_id }: { trigger: React.ReactNode; program_id: string }) {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<ReviewFormState>(INITIAL_FORM)
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (field: keyof ReviewFormState, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleCancel = () => {
        setOpen(false)
        setForm(INITIAL_FORM)
    }

    const handleReview = async () => {

        if (!form.rating) {
            toast.error("Please provide a rating")
            return
        }

        if (!form.body.trim()) {
            toast.error("Please write a review")
            return
        }


        setSubmitting(true)

        try {
            const formData = new FormData()
            formData.append("rating", String(form.rating))
            formData.append("review", form.body)

            const res = await programReview(program_id, formData) 
            if (res && "success" in res && res.success && "data" in res) {
                const { status, message } = res.data

                if (status) {
                    window.dispatchEvent(new Event("programevent"))
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
            setOpen(false)
            setForm(INITIAL_FORM)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="border-border/50 bg-zinc-950 text-white sm:max-w-lg border border-secondary   ">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Write a review
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Share your experience and help others make better decisions.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                    {/* Rating */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Rating</label>
                        <StarRating
                            value={form.rating}
                            onChange={(val) => handleChange("rating", val)}
                        />
                    </div>

                    {/* Body */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Your review</label>
                        <Textarea
                            rows={5}
                            value={form.body}
                            onChange={(e) => handleChange("body", e.target.value)}
                            placeholder="Tell others about your experience..."
                            className="resize-none border-zinc-800 bg-zinc-900 mt-2 "
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 bg-primary border-t border-secondary   ">
                    <Button variant="outline" onClick={handleCancel} className="bg-transparent hover:bg-transparent hover:text-white   "  >
                        Cancel
                    </Button>

                    <CommonBtn
                        onClick={handleReview}
                        text="Submit review"
                        className="bg-brand! hover:bg-brand!  text-primary w-fit  px-2    "
                        variant="default"
                        size="sm"
                        disabled={submitting}
                        isLoading={submitting}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}