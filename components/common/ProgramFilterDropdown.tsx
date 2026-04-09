import React, { useState, useEffect, useRef } from "react"
import { Icon } from "@/components/custom/Icon"

const ProgramFilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("All Programs")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const options = [
    "All Programs",
    "Upcoming Programs", 
    "Active Programs",
    "Deactive Programs"
  ]

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
    // Handle filter logic here
    console.log("Selected:", option)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand/20"
      >
        <span className="text-sm font-medium">{selectedOption}</span>
        <Icon 
          width="16" 
          height="16" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Icon>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full px-4 py-2 text-left text-sm text-white transition-colors duration-150 hover:bg-brand hover:text-black focus:bg-brand focus:text-black focus:outline-none"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramFilterDropdown
