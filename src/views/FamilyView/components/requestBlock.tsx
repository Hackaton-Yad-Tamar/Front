import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Request } from "../../../types/requestType";
import { themeColors } from "../../../App";
import RequestDialog, { getRequestStatusColor } from "./requestInfoDialog";
import { useState } from "react";
import mockRequest from "../../../mockRequest";

const RequestBlock = ({ request }: { request: Request }) => {
  const [openDialog, setOpenDialog] = useState(false);
  console.log(openDialog);

  return (
    <Grid item xs={12} sm={6} md={4} key={request.id}>
      <Paper
        sx={{ p: 3, borderRadius: "10px", boxShadow: 3 }}
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="right"
            sx={{ color: themeColors.darkBlue }}
          >
            {request.title}
          </Typography>
          <Button
            variant="contained"
            sx={{
              alignSelf: "start",
              borderRadius: "20px",
            }}
            color={getRequestStatusColor(request.status)}
          >
            {request.status}
          </Button>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="textSecondary" textAlign="right">
          {request.description}
        </Typography>
      </Paper>
      <RequestDialog
        setOpen={setOpenDialog}
        open={openDialog}
        request={mockRequest}
      />
    </Grid>
  );
};

export default RequestBlock;
