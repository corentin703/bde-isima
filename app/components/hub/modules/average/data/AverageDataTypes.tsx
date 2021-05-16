interface SubjectData {
  name: String
  coef: Number
  mark?: Number
}

interface UEData {
  name: String
  subjects: SubjectData[]
}

interface SectorData {
  name: String
  ues: UEData[]

  isCurrent?: boolean
}

interface SemesterData {
  uesMain?: UEData[]
  sectors?: SectorData[]
}

interface Year {
  name: String
  semesters: SemesterData[]

  isCurrent?: boolean
}

export type { SubjectData, UEData, SectorData, SemesterData, Year }
