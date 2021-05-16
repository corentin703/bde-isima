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
}

interface SemesterData {
  uesMain?: UEData[]
  sectors?: SectorData[]
}

interface Year {
  name: String
  semesters: SemesterData[]
}

export type { SubjectData, UEData, SectorData, SemesterData, Year }
