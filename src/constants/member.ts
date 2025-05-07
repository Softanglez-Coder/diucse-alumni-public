
export interface Member {
    id: number;
    name: string;
    designation: string;
    institute: string;
    level: string;
    shift: string;
    batch: string;
    email: string;
    mobile: string;
  }
  
  export const members: Member[] = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    name: "Full Name",
    designation: "ABC",
    institute: "XYZ",
    level: "B.Sc",
    shift: "Day",
    batch: "39",
    email: "email@example.com",
    mobile: "0123456789",
  }));
  