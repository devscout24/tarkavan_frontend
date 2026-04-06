import StrengthCategoryItem from "./strength-category-item"

 

export interface StrengthCategory {
  id: string
  label: string
  strengths: string[]
}

interface StrengthCategorySidebarProps {
  categories: StrengthCategory[]
  activeCategoryId: string
  onCategorySelect: (categoryId: string) => void
}

export default function StrengthCategorySidebar({
  categories,
  activeCategoryId,
  onCategorySelect,
}: StrengthCategorySidebarProps) {
  return (
    <div className="rounded-xl border border-white/10 p-3">
      <div className="space-y-4">
        {categories.map((category) => (
          <StrengthCategoryItem
            key={category.id}
            label={category.label}
            selected={activeCategoryId === category.id}
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </div>
    </div>
  )
}
