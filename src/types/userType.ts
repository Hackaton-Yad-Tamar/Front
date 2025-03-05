export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: City;
  userType: UserType;
  profilePicture: string;
  isApproved: boolean;
  approvedBy: string;
  approvedAt: Date;
  createdAt: Date;
};

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
}

export enum UserType {
  Family = "משפחה",
  Volunteer = "מתנדב",
  Admin = "מנהל מערכת",
}
