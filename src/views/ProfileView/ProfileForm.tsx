import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type React from "react";
import { useRef, useState } from "react";
import { User, UserType, VehicleType } from "../../types/userType";
import { themeColors } from "../../App";

interface ProfileFormProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

export function ProfileForm({ user, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<User>({ ...user });
  const [previewImage, setPreviewImage] = useState<string | null>(user.profilePicture || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const maxReviews = formData.reviews?.length || 0;

  const handleNextReview = () => {
    setActiveReviewIndex((prevIndex) => (prevIndex + 1) % maxReviews);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prevIndex) => (prevIndex - 1 + maxReviews) % maxReviews);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, userType: e.target.value as UserType }));
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, vehicle: e.target.value as VehicleType }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    return `${formData.first_name.charAt(0)}${formData.last_name.charAt(0)}`;
  };

  // Handle stats changes
  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const statField = name.split(".")[1];
    const numValue = Number.parseInt(value);

    setFormData((prev) => ({
      ...prev,
      stats: {
        ...(prev.stats || { eventsParticipated: 0, hoursVolunteered: 0, distanceTravelled: 0 }),
        [statField]: numValue,
      },
    }));
  };

  return (
    <Card elevation={3}>
      <form onSubmit={handleSubmit}>
        <CardHeader
          title={
            <Typography variant="h5" sx={{ color: "#00AEEE" }}>
              עריכת פרופיל
            </Typography>
          }
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar src={previewImage || undefined} sx={{ width: 100, height: 100, mb: 1 }}>
                {!previewImage && getInitials()}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={triggerFileInput}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "white",
                  boxShadow: 1,
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="שם פרטי"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="שם משפחה"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="סוג משתמש"
                name="userType"
                value={formData.userType}
                onChange={handleUserTypeChange}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="family">משפחה</MenuItem>
                <MenuItem value="volunteer">מתנדב</MenuItem>
                <MenuItem value="admin">מנהל</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ת''ז"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="מספר טלפון"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="מייל"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="כתובת"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="עיר פעילות"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            {/* Volunteer specific fields */}
            {formData.userType === "volunteer" && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ color: "#00AEEE", mb: 2 }}>
                    מידע על המתנדב
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="אזור התנדבות (גיאוגרפי)"
                    name="volunteeringArea"
                    value={formData.volunteeringArea || ""}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="כלי רכב"
                    name="vehicle"
                    value={formData.vehicle || "none"}
                    onChange={handleVehicleChange}
                    variant="outlined"
                    margin="normal"
                  >
                    <MenuItem value="car">פרטי</MenuItem>
                    <MenuItem value="motorcycle">אופנוע</MenuItem>
                    <MenuItem value="truck">משאית</MenuItem>
                    <MenuItem value="none">אין</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="אודות"
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    margin="normal"
                    placeholder="Tell us about yourself and your volunteering experience..."
                  />
                </Grid>

                {/* Statistics fields */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    נתונים על המתנדב
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="אירועים שביצע"
                    name="stats.eventsParticipated"
                    type="number"
                    value={formData.stats?.eventsParticipated || 0}
                    onChange={handleStatsChange}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="שעות התנדבות"
                    name="stats.hoursVolunteered"
                    type="number"
                    value={formData.stats?.hoursVolunteered || 0}
                    onChange={handleStatsChange}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="מרחק נסיעות כולל (ק''מ)"
                    name="stats.distanceTravelled"
                    type="number"
                    value={formData.stats?.distanceTravelled || 0}
                    onChange={handleStatsChange}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                {/* Reviews section - typically this would be read-only in a real app */}
                {formData.reviews && formData.reviews.length > 0 && (
                  <Grid item xs={12} sx={{ paddingRight: "15rem"}}>
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                      מילים מאת המשפחות
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      הביקורות מנוהלות ע"י המערכת ולא ניתנות לעריכה
                    </Typography>

                    {/* Review slider in edit mode */}
                    <Paper
                      elevation={1}
                      sx={{
                        p: 3,
                        position: "relative",
                        minHeight: "200px",
                        display: "flex",
                        flexDirection: "column",
                        width: "35rem"}}
                    >
                      {/* Current review */}
                      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Avatar sx={{ bgcolor: themeColors.darkBlue, mr: 2 }}>
                            <FamilyRestroomIcon />
                          </Avatar>
                          <Box sx={{ paddingRight: 2 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "black", fontWeight: "medium" }}
                            >
                              {formData.reviews[activeReviewIndex].familyName}
                            </Typography>
                            <Typography variant="body2" color="black">
                              {new Date(
                                formData.reviews[activeReviewIndex].date
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>

                        <Rating
                          value={formData.reviews[activeReviewIndex].rating}
                          readOnly
                          size="small"
                          sx={{ mb: 2, color: "#00AEEE" }}
                        />

                        <Typography
                          variant="body1"
                          component="div"
                          sx={{
                            color: "black",
                            flex: 1,
                            mb: 2,
                          }}
                        >
                          {formData.reviews[activeReviewIndex].comment}
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
                            הבא
                            <KeyboardArrowLeft />
                          </Button>
                        }
                        backButton={
                          <Button
                            size="small"
                            onClick={handlePrevReview}
                            disabled={maxReviews <= 1}
                            sx={{ color: "#00AEEE" }}
                          >
                            <KeyboardArrowRight />
                            הקודם
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
        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Button variant="outlined" onClick={onCancel} sx={{ mr: 1}}>
            ביטול
          </Button>
          <Button variant="contained" type="submit">
            שמירת שינויים
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
