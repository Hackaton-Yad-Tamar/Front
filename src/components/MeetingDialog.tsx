import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { Meeting } from './CalendarComponent';
import useStyles from './MeetingDialogStyles';

type DialogProps = {
  selectedEvent: Meeting;
  closeDialog: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialogSlide = ({
  closeDialog,
  selectedEvent,
}: DialogProps) => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClose = () => {
    closeDialog();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        dir="rtl"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{selectedEvent.title}</DialogTitle>
        <DialogContent
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DialogContentText
            id="alert-dialog-slide-description"
            className={classes.dialogContent}
          >
            <DateRangeIcon style={{ marginLeft: '2vw' }} />
            <div dir="ltr">
              {selectedEvent.start.toLocaleString('fr-FR')} -{' '}
              {selectedEvent.end.toLocaleString('fr-FR')}
            </div>
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-slide-description"
            className={classes.dialogContent}
          >
            <LocationOnIcon style={{ marginLeft: '2vw' }} />
            <Typography> {selectedEvent.location}</Typography>
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-slide-description"
            className={classes.dialogContent}
          >
            <LocalPhoneIcon style={{ marginLeft: '2vw' }} />
            <Typography> {selectedEvent.familyContact}</Typography>
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-slide-description"
            className={classes.dialogContent}
            style={{ paddingTop: '2vh' }}
          >
            <Typography>
              {' '}
              {selectedEvent.requestDescription}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סיום</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
