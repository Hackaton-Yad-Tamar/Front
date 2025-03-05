import { Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { User } from "../../types/userType";
import { ProfileCard } from "./ProfileCard";
import { ProfileForm } from "./ProfileForm";

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {isEditing ? (
        <ProfileForm user={userData} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <ProfileCard user={userData} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" startIcon={<Edit />} onClick={() => setIsEditing(true)}>
              עריכת פרופיל
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ProfileView;
