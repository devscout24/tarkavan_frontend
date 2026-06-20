"use client"
import { TiWorld } from "react-icons/ti";

export default function VisibilityEdit() {
  return (
    <div className="w-fit rounded-xl flex items-center">
      <div className="flex h-10 w-fit bg-brand px-4 items-center justify-between rounded-lg border border-gray-300">
        <div className="flex items-center gap-2">
          <TiWorld className="h-4 w-4" />
          <span className="text-black">Public</span>
        </div>
      </div>
    </div>
  );
}
