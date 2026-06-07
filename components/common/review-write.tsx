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

// ─── Types ────────────────────────────────────────────────
interface ReviewFormState {
    rating: number
    title: string
    body: string
}

const INITIAL_FORM: ReviewFormState = {
    rating: 0,
    title: "",
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
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-600"
                            }`}
                    />
                </button>
            ))}
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────
export function WriteReviewDialog({ trigger }: { trigger: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<ReviewFormState>(INITIAL_FORM)

    const handleChange = (field: keyof ReviewFormState, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        console.log("Submitting review:", form)
        // TODO: call API
        setOpen(false)
        setForm(INITIAL_FORM)
    }

    const handleCancel = () => {
        setOpen(false)
        setForm(INITIAL_FORM)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="border-border/50 bg-zinc-950 text-white sm:max-w-lg">
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

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Review title</label>
                        <Input
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Summarize your experience..."
                            className="border-zinc-800 bg-zinc-900"
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
                            className="resize-none border-zinc-800 bg-zinc-900"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!form.rating || !form.title || !form.body}
                        className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90"
                    >
                        Submit review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}