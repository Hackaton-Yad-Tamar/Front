import { City, User, UserType } from './types/userType';

export const mockUser: User = {
  id: '21345876',
  firstName: 'ישראלה',
  lastName: 'ישראלי',
  userType: 'volunteer' as UserType,
  phoneNumber: '058-1234567',
  address: 'בן גוריון 100',
  city: City.RamatGan,
  email: 'israella.israeli@example.com',
  createdAt: new Date(),
  approvedAt: new Date(),
  approvedBy: 'נדב',
  isApproved: true,
  profilePicture: '/placeholder.svg?height=200&width=200',

  // Volunteer specific fields
  volunteeringArea: 'תל אביב רבתי',
  vehicle: 'פרטי' as const,
  bio: 'מתנדבת מזה 3 שנים ואוהבת מאוד אנשים ואת הקהילה. מתמחה במשלוחי אוכל ועזרה במקרי חירום רפואיים קטנים.',
  stats: {
    eventsParticipated: 47,
    hoursVolunteered: 152,
    distanceTravelled: 1280,
  },
  // New fields for volunteer rating and reviews
  rating: 4.7,
  reviews: [
    {
      id: 'rev1',
      familyName: 'משפחת כהן',
      date: '2023-12-15',
      rating: 5,
      comment:
        'ישראלה עזרה לנו באדיבות. היא יצאה מגדרה כדי לסייע לנו בתקופה קשה.',
    },
    {
      id: 'rev2',
      familyName: 'משפחת שפילברג',
      date: '2023-10-22',
      rating: 4,
      comment: 'מקצועית מאוד, בהחלט נשמח שתחזור אלינו',
    },
    {
      id: 'rev3',
      familyName: 'קבט',
      date: '2023-08-05',
      rating: 5,
      comment:
        'ישראלה מדהימה מאוד, עזרה לנו במשך חודשים ארוכים והורידנו מאיתנו הרבה לחצים ומתחים',
    },
  ],
};
export const mockFamily: User = {
  id: '21345876',
  firstName: 'ישראלה',
  lastName: 'ישראלי',
  userType: 'family' as UserType,
  phoneNumber: '+972 581234567',
  address: 'בן גוריון 100',
  city: City.RamatGan,
  email: 'israella.israeli@example.com',
  createdAt: new Date(),
  approvedAt: new Date(),
  approvedBy: 'נדב',
  isApproved: true,
  profilePicture: '/placeholder.svg?height=200&width=200',
  vehicle: 'פרטי' as const,
};
