import SoccerLineUp, { type Team } from 'react-soccer-lineup'

interface SoccerFieldProps {
  positions?: any[]
  onPositionClick?: (positionId: string) => void
  primaryPosition?: string
  secondaryPosition?: string
}

// Initial visible positions
const getVisiblePositions = (primaryPosition?: string, secondaryPosition?: string) => {
  // Always keep GK and ST visible
  const corePositions = ["GK", "ST"]
  const flexiblePositions = ["RCB", "RW", "CM", "RB", "LB", "CCDM", "CAM", "LW"]
  
  if (!primaryPosition && !secondaryPosition) {
    return [...corePositions, "RCB", "RW", "CM"]
  }
  
  const selected = [primaryPosition, secondaryPosition].filter(Boolean)
  const visible = new Set(corePositions)
  
  // Add flexible positions, prioritizing selected ones
  const remainingSlots = 5 - corePositions.length
  const positionsToAdd: string[] = []
  
  // First add selected positions that aren't already visible
  selected.forEach(pos => {
    if (pos && !visible.has(pos)) {
      positionsToAdd.push(pos)
    }
  })
  
  // Then fill remaining slots with flexible positions that aren't selected
  flexiblePositions.forEach(pos => {
    if (positionsToAdd.length < remainingSlots && !selected.includes(pos) && !visible.has(pos)) {
      positionsToAdd.push(pos)
    }
  })
  
  positionsToAdd.forEach(pos => visible.add(pos))
  
  return Array.from(visible)
}

export default function SoccerField({ 
  positions = [], 
  onPositionClick,
  primaryPosition,
  secondaryPosition 
}: SoccerFieldProps) {
  const visiblePositions = getVisiblePositions(primaryPosition, secondaryPosition)
  
  const createPlayerStyle = (positionId: string) => {
  const isVisible = visiblePositions.includes(positionId)
  const isPrimary = primaryPosition === positionId
  const isSecondary = secondaryPosition === positionId
  
  return {
    color: isVisible ? (isPrimary ? "#DB0000" : isSecondary ? "#FF6B6B" : 'transparent') : 'transparent',
    borderColor: isVisible ? (isPrimary ? "#ffffff" : isSecondary ? "#8B0000" : '#ffffff') : 'transparent',
    nameColor: isVisible ? '#333333' : 'transparent',
    numberColor: isVisible ? '#333333' : 'transparent'
  }
}

// Custom position adjustments using the correct offset property
const getPositionWithOffset = (positionId: string, basePlayer: any) => {
  const positionAdjustments: Record<string, { x?: number; y?: number }> = {
    "GK": { x: 10, y: 0 },  
    "ST": { x: -8, y: 0 }, 
    "RB": { x:11,y: 5 },    
    "LB": {x:11, y: 0 },   
    "RCB": { x: 11, y: 0 },  
    "LCB": { x: 11, y: 0 },  
    "CDM": { y: 0 },  
    "CM": { y: 0 },    
    "CAM": { x:-16, y: -30 },  
    "RW": { x: 0, y: 0 }, 
    "LW": { x: 0, y: 0 },  
  }
  
  const adjustment = positionAdjustments[positionId]
  
  return {
    ...basePlayer,
    ...(adjustment && { offset: adjustment })
  }
}

  const homeTeam: Team = {
    squad: {
      gk: getPositionWithOffset("GK", { name: "GK", style: createPlayerStyle("GK") }),
      df: [
        getPositionWithOffset("RB", { name: "RB", style: createPlayerStyle("RB") }),
        getPositionWithOffset("RCB", { name: "RCB", style: createPlayerStyle("RCB") }),
        getPositionWithOffset("LCB", { name: "LCB", style: createPlayerStyle("LCB") }),
        getPositionWithOffset("LB", { name: "LB", style: createPlayerStyle("LB") })
      ],
      cm: [
        getPositionWithOffset("CDM", { name: "CDM", style: createPlayerStyle("CDM") }),
        getPositionWithOffset("CM", { name: "CM", style: createPlayerStyle("CM") }),
        getPositionWithOffset("CAM", { name: "CAM", style: createPlayerStyle("CAM") })
      ],
      fw: [
        getPositionWithOffset("RW", { name: "RW", style: createPlayerStyle("RW") }),
        getPositionWithOffset("ST", { name: "ST", style: createPlayerStyle("ST") }),
        getPositionWithOffset("LW", { name: "LW", style: createPlayerStyle("LW") })
      ]
    },
    style: {
      color: 'transparent',
      borderColor: '#ffffff',
      nameColor: '#333333',
      numberColor: '#333333'
    }
  };
  
  const awayTeam: Team = {
    squad: {
      gk: { number: 1 },
      df: [{ number: 2 }, { number: 4 }, { number: 5 }, { number: 3 }],
      cm: [{ number: 6 }, { number: 8 }, { number: 10 }],
      fw: [{ number: 11 }, { number: 9 }, { number: 7 }]
    },
    style: {
      borderColor: '#ffffff'
    }
  };
  
  return (
    <div className="relative w-full  flex items-center justify-center ">
      <div className="w-full h-full max-w-full overflow-hidden">
        <SoccerLineUp
          size='responsive'
          color='#327D61'
          pattern='squares'
          // homeTeam={homeTeam}
          awayTeam={homeTeam}
        />
      </div>
    </div>
  )
}
