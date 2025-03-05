export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  phoneNumber: string;
  address: string;
  city: City;
  email: string;
  profilePicture?: string;
  isApproved: boolean;
  approvedBy: string;
  approvedAt: Date;
  createdAt: Date;

  // Volunteer specific fields
  volunteeringArea?: string;
  vehicle: VehicleType;
  bio?: string;
  stats?: VolunteerStats;
  rating?: number;
  reviews?: Review[];
};

export interface Review {
  id: string;
  familyName: string;
  date: string;
  rating: number;
  comment: string;
}

export interface VolunteerStats {
  eventsParticipated: number;
  hoursVolunteered: number;
  distanceTravelled: number;
}

export enum City {
  TLV = "תל אביב",
  Jerusalem = "ירושלים",
  Haifa = "חיפה",
  RishonLezion = "ראשון לציון",
  PetahTikva = "פתח תקווה",
  Ashdod = "אשדוד",
  Natania = "נתניה",
  BeerSheva = "באר שבע",
  Holon = "חולון",
  BatYam = "בת ים",
  RamatGan = "רמת גן"
}

export type UserType = "family" | "volunteer" | "admin";

export type VehicleType = "פרטי" | "אופנוע" | "משאית";
