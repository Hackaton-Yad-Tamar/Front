import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import EmailIcon from "@mui/icons-material/Email";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { User, UserType } from "../../types/userType";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  // State for review slider
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const maxReviews = user.reviews?.length || 0;

  const handleNextReview = () => {
    setActiveReviewIndex((prevIndex) => (prevIndex + 1) % maxReviews);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prevIndex) => (prevIndex - 1 + maxReviews) % maxReviews);
  };

  const userTypeColors: Record<UserType, { bg: string; color: string }> = {
    family: { bg: "#e3f2fd", color: "#1565c0" },
    volunteer: { bg: "#e8f5e9", color: "#2e7d32" },
    admin: { bg: "#f3e5f5", color: "#7b1fa2" },
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  // Get the appropriate vehicle icon
  const getVehicleIcon = () => {
    switch (user.vehicle) {
      case "car":
        return <DirectionsCarIcon fontSize="small" sx={{ color: "text.secondary" }} />;
      case "motorcycle":
        return <TwoWheelerIcon fontSize="small" sx={{ color: "text.secondary" }} />;
      case "truck":
        return <LocalShippingIcon fontSize="small" sx={{ color: "text.secondary" }} />;
      case undefined:
      default:
        return <DoNotDisturbIcon fontSize="small" sx={{ color: "text.secondary" }} />;
    }
  };

  return (
    <Card elevation={3}>
      <CardHeader
        avatar={
          <Avatar src={user.profilePicture || undefined} sx={{ width: 64, height: 64 }}>
            {!user.profilePicture && getInitials()}
          </Avatar>
        }
        title={
          <Typography variant="h5" component="h2" sx={{ color: "#00AEEE", fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </Typography>
        }
        action={
          <Chip
            label={user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
            sx={{
              bgcolor: userTypeColors[user.userType].bg,
              color: userTypeColors[user.userType].color,
              fontWeight: "medium",
            }}
          />
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          {/* Basic information for all user types */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BadgeIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  ID:
                </Typography>
                <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                  {user.id}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Phone:
                </Typography>
                <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                  {user.phoneNumber}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <HomeIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Address:
                </Typography>
                <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                  {user.address}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  City:
                </Typography>
                <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                  {user.city}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Joined:
                </Typography>
                <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                  {new Date(user.approvedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Volunteer specific information */}
          {user.userType === "volunteer" && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ color: "#00AEEE", mb: 2 }}>
                  Volunteer Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <MapIcon fontSize="small" sx={{ color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          Volunteering Area:
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                          {user.volunteeringArea}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {getVehicleIcon()}
                        <Typography variant="body2" color="text.secondary">
                          Vehicle:
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#00AEEE" }}>
                          {/* {user.vehicle?.charAt(0).toUpperCase() + user.vehicle?.slice(1)} */}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <StarIcon fontSize="small" sx={{ color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          Rating:
                        </Typography>
                        <Rating
                          value={user.rating || 0}
                          precision={0.1}
                          readOnly
                          size="small"
                          sx={{ color: "#00AEEE" }}
                        />
                        <Typography variant="body1" sx={{ color: "#00AEEE", ml: 1 }}>
                          ({user.rating?.toFixed(1)})
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {user.bio && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Bio:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#00AEEE", mt: 1 }}>
                        {user.bio}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              {/* Statistics pane */}
              {user.stats && (
                <Grid item xs={12}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: "#f5f5f5", mt: 2 }}>
                    <Typography variant="h6" sx={{ color: "#00AEEE", mb: 2 }}>
                      Volunteer Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box
                          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                          <EmojiEventsIcon sx={{ fontSize: 40, color: "#00AEEE", mb: 1 }} />
                          <Typography variant="h5" sx={{ color: "#00AEEE", fontWeight: "bold" }}>
                            {user.stats.eventsParticipated}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Events
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={4}>
                        <Box
                          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                          <AccessTimeIcon sx={{ fontSize: 40, color: "#00AEEE", mb: 1 }} />
                          <Typography variant="h5" sx={{ color: "#00AEEE", fontWeight: "bold" }}>
                            {user.stats.hoursVolunteered}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Hours
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={4}>
                        <Box
                          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                          <MapIcon sx={{ fontSize: 40, color: "#00AEEE", mb: 1 }} />
                          <Typography variant="h5" sx={{ color: "#00AEEE", fontWeight: "bold" }}>
                            {user.stats.distanceTravelled}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Km Travelled
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )}

              {/* Reviews slider */}
              {user.reviews && user.reviews.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: "#00AEEE", mt: 3, mb: 2 }}>
                    Family Reviews
                  </Typography>

                  <Paper
                    elevation={1}
                    sx={{
                      p: 3,
                      position: "relative",
                      minHeight: "200px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Current review */}
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar sx={{ bgcolor: "#00AEEE", mr: 2 }}>
                          <FamilyRestroomIcon />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#00AEEE", fontWeight: "medium" }}
                          >
                            {user.reviews[activeReviewIndex].familyName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(user.reviews[activeReviewIndex].date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Rating
                        value={user.reviews[activeReviewIndex].rating}
                        readOnly
                        size="small"
                        sx={{ mb: 2, color: "#00AEEE" }}
                      />

                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          color: "#00AEEE",
                          flex: 1,
                          mb: 2,
                        }}
                      >
                        {user.reviews[activeReviewIndex].comment}
                      </Typography>
                    </Box>

                    {/* Stepper controls */}
                    <MobileStepper
                      variant="dots"
                      steps={maxReviews}
                      position="static"
                      activeStep={activeReviewIndex}
                      sx={{
                        bgcolor: "transparent",
                        "& .MuiMobileStepper-dot": {
                          bgcolor: "rgba(0, 174, 238, 0.3)",
                        },
                        "& .MuiMobileStepper-dotActive": {
                          bgcolor: "#00AEEE",
                        },
                      }}
                      nextButton={
                        <Button
                          size="small"
                          onClick={handleNextReview}
                          disabled={maxReviews <= 1}
                          sx={{ color: "#00AEEE" }}
                        >
                          Next
                          <KeyboardArrowRight />
                        </Button>
                      }
                      backButton={
                        <Button
                          size="small"
                          onClick={handlePrevReview}
                          disabled={maxReviews <= 1}
                          sx={{ color: "#00AEEE" }}
                        >
                          <KeyboardArrowLeft />
                          Previous
                        </Button>
                      }
                    />
                  </Paper>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
