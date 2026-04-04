export const MODAL_ROLE_QUERY_KEY = "modalRole"
export const ADD_ATHLETE_MODAL_QUERY_KEY = "addNewChildren"
export const ADD_ATHLETE_MODAL_CLEANUP_KEYS = [
  ADD_ATHLETE_MODAL_QUERY_KEY,
  "modalRole",
  "primaryPosition",
  "secondaryPosition",
  "seasonStatsRole",
]

export type AddAthleteRole = "parent" | "player"
export type AddAthleteModalStep =
  | "coreIdentity"
  | "positionMap"
  | "seasonStats"
  | "strengths"

type RoleHeaderCopy = {
  title: string
  subtitle: string
}

const ROLE_HEADER_COPY: Record<AddAthleteRole, RoleHeaderCopy> = {
  parent: {
    title: "Add New Parent",
    subtitle: "Start by defining the athlete's core identity profile.",
  },
  player: {
    title: "Add New Player",
    subtitle: "Start by defining the athlete's core identity profile.",
  },
}

export const resolveAddAthleteRole = (value: string | null): AddAthleteRole => {
  if (value === "player" || value === "parent") {
    return value
  }

  return "parent"
}

export const getAddAthleteRoleHeaderCopy = (value: string | null) => {
  const role = resolveAddAthleteRole(value)
  return ROLE_HEADER_COPY[role]
}

export const buildAddAthleteModalParams = (
  searchParams: URLSearchParams,
  role: AddAthleteRole,
  step: AddAthleteModalStep = "coreIdentity"
) => {
  const nextParams = new URLSearchParams(searchParams)
  nextParams.set(ADD_ATHLETE_MODAL_QUERY_KEY, step)

  if (role === "player") {
    nextParams.set(MODAL_ROLE_QUERY_KEY, role)
  } else {
    nextParams.delete(MODAL_ROLE_QUERY_KEY)
  }

  return nextParams
}