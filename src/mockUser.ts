import { City, User, UserType } from "./types/userType";

const mockUser: User = {
  id: "USR12345",
  firstName: "Jane",
  lastName: "Doe",
  userType: "volunteer" as UserType,
  phoneNumber: "+1 (555) 123-4567",
  address: "123 Main Street, Apt 4B",
  city: City.RishonLezion,
  email: "jane.doe@example.com",
  createdAt: new Date(),
  approvedAt: new Date(),
  approvedBy: "nadav",
  isApproved: true,
  profilePicture: "/placeholder.svg?height=200&width=200",

  // Volunteer specific fields
  volunteeringArea: "Downtown & Mission District",
  vehicle: "car" as const,
  bio: "I've been volunteering for 3 years and love helping my community. I specialize in food delivery and emergency response.",
  stats: {
    eventsParticipated: 47,
    hoursVolunteered: 152,
    distanceTravelled: 1280,
  },
  // New fields for volunteer rating and reviews
  rating: 4.7,
  reviews: [
    {
      id: "rev1",
      familyName: "Smith Family",
      date: "2023-12-15",
      rating: 5,
      comment:
        "Jane was incredibly helpful and kind. She went above and beyond to assist us during a difficult time.",
    },
    {
      id: "rev2",
      familyName: "Johnson Family",
      date: "2023-10-22",
      rating: 4,
      comment: "Very professional and prompt. Would definitely request her help again.",
    },
    {
      id: "rev3",
      familyName: "Garcia Family",
      date: "2023-08-05",
      rating: 5,
      comment:
        "Jane is amazing! She's been helping our family for months and we're so grateful for her dedication.",
    },
  ],
};

export default mockUser;
