export interface SchoolRecapRow {
  schoolId: string;
  schoolName: string;
  totalStudents: number;
  averagePoints: number;
  fillRatePercent: number;
}

export interface PlatformSummary {
  totalSchools: number;
  totalHeadmasters: number;
  totalTeachers: number;
  totalStudents: number;
}
