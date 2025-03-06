import { Edit } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import MUICalendar from '../../components/CalendarComponent';
import { User } from '../../types/userType';
import { ProfileCard } from './ProfileCard';
import { ProfileForm } from './ProfileForm';
import { Link } from "react-router-dom";

type ProfileViewProps = {
  user: User;
};

function ProfileView({ user }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User>(user);

  const handleSave = (updatedUser: User) => {
    // In a real app, you would save this to your backend
    setUserData(updatedUser);
    setIsEditing(false);
  };

  return (
    <Stack
      direction="column-reverse"
      spacing={10}
      sx={{
        position: "relative",
        background: "linear-gradient(to bottom, #a5ddf7, #78c2f2)",
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          direction: "rtl",
          paddingInline: "5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isEditing ? (
          <ProfileForm user={userData} onSave={handleSave} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <ProfileCard user={userData} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                style={{gap: 2}}
                onClick={() => setIsEditing(true)}
              >
                עריכת פרופיל
              </Button>
              <Link to={"/change-password"} style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                style={{gap: 2}}
                onClick={() => setIsEditing(true)}
              >
                שינוי סיסמה
              </Button>
              </Link>
            </Box>
            <MUICalendar />
          </>
        )}
      </Box>
    </Stack>
  );
}

export default ProfileView;
