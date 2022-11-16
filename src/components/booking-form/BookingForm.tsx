import React, { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import DateAndTimePicker from "components/date-time-picker";
import Button from "components/button";
import ConfirmDialog from "components/confirm-dialog";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import {
  setRoomId,
  setBookingError,
  setDaysOfWeek,
  setDescription,
  setEnd,
  setFloor,
  setStart,
  setTitle,
} from "redux&saga/slices/booking.slice";
import Modal from "components/modal/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InviteCoworkers from "./invite-coworkers/InviteCoworkers";
import Selector from "./selector/Selector";
import { SelectChangeEvent } from "@mui/material/Select";
import { rooms } from "configs/rooms";
import MenuItem from "@mui/material/MenuItem";
import { daysOfTheWeek, floors } from "constants/booking-form";
import SelectorMultiple from "./selector/SelectorMultiple";
import { Errors } from "constants/errors";
import {
  checkMatchEndDate,
  checkMatchStartDate,
} from "utils/check-crossed-date";

interface BookingFormProps {
  edit: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveEvent: () => void;
}

const BookingForm = ({
  edit,
  handleSubmit,
  handleRemoveEvent,
}: BookingFormProps) => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    title,
    start,
    end,
    floor,
    errors,
    description,
    roomId,
    daysOfWeek,
    bookings,
  } = useAppSelector((state) => state.booking);
  const { roomsByFloor, floors } = useAppSelector((state) => state.rooms);
  const onConfirm = () => {
    handleRemoveEvent();
    setOpenConfirmation(false);
  };
  const onDismiss = () => {
    setOpenConfirmation(false);
  };

  const handleBlurTitle = () => {
    if (title?.trim().length > 40 || title?.trim().length < 5) {
      dispatch(setBookingError({ title: Errors.titleLength }));
    } else dispatch(setBookingError({ title: "" }));
  };
  const handleBlurDescription = () => {
    if (description?.trim().length > 200 || description?.trim().length < 5) {
      dispatch(setBookingError({ description: Errors.descriptionLength }));
    } else dispatch(setBookingError({ description: "" }));
  };

  const handleChangeRoom = (e: SelectChangeEvent<string>) => {
    dispatch(setRoomId(Number(e.target.value)));
    dispatch(setBookingError({ roomId: "" }));
  };
  const handleChangeFloor = (e: SelectChangeEvent<string>) => {
    dispatch(setFloor(e.target.value));
    dispatch(setRoomId(null));
    dispatch(setBookingError({ floor: "" }));
  };

  const handleChangeStart = (event: Dayjs | null) => {
    if (event !== null) {
      dispatch(setStart(event.format("YYYY-MM-DDTHH:mm")));
    }
  };
  const handleChangeEnd = (event: Dayjs | null) => {
    if (event !== null) {
      dispatch(setEnd(event.format("YYYY-MM-DDTHH:mm")));
    }
  };
  const handleCloseStart = (value: Dayjs | null) => {
    if (value !== null) {
      const startDate = value.format("YYYY-MM-DDTHH:mm");
      const checkDateForMatch = checkMatchStartDate(bookings, startDate, end);
      checkDateForMatch
        ? dispatch(setBookingError({ start: Errors.matchDate }))
        : dispatch(setBookingError({ start: "" }));
    }
  };
  const handleCloseEnd = (value: Dayjs | null) => {
    if (value !== null) {
      const endDate = value.format("YYYY-MM-DDTHH:mm");
      const checkDateForMatch = checkMatchEndDate(bookings, start, endDate);
      checkDateForMatch
        ? dispatch(setBookingError({ end: Errors.matchDate }))
        : dispatch(setBookingError({ end: "" }));
    }
  };

  const handleChangeWeek = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    dispatch(
      setDaysOfWeek(typeof value === "string" ? value.split(",") : value)
    );
  };



  const menuItemsRoom =
    roomsByFloor[Number(floor) - 1].length > 0 ? (
      roomsByFloor[Number(floor) - 1].map((room) => {
        return (
          <MenuItem key={room.roomId} value={room.roomId}>
            {room.name}
          </MenuItem>
        );
      })
    ) : null;
  const menuItemsFloor = floors.map((floor) => {
    return (
      roomsByFloor[Number(floor) - 1].length > 0 && (
        <MenuItem key={floor} value={floor}>
          {floor}
        </MenuItem>
      )
    );
  });
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mb: "20px",
          textAlign: "center",
          color: "var(--accent-text-color)",
        }}
      >
        Booking
      </Typography>
      <Box
        sx={{ displa: "flex", flexDirection: "column", p: "20px" }}
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Grid container maxWidth={1000} spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ mb: "25px", height: "75px" }}>
              <TextField
                error={Boolean(errors.title)}
                autoFocus
                label="Title"
                data-testid="input-title"
                fullWidth
                value={title}
                onBlur={handleBlurTitle}
                onChange={(event) => dispatch(setTitle(event.target.value))}
                helperText={errors.title ? errors.title : ""}
              />
            </Box>
            <Box
              sx={{
                mb: "25px",
                height: "120px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5%/50% ",
                },
              }}
            >
              <TextField
                value={description}
                onChange={(event) =>
                  dispatch(setDescription(event.target.value))
                }
                label="Description"
                fullWidth
                multiline
                rows={3}
                onBlur={handleBlurDescription}
                data-testid="input-description"
                error={Boolean(errors.description)}
                helperText={errors.description ? errors.description : ""}
              />
            </Box>
            <Box
              sx={{ mb: "20px", display: "flex", gap: "15px", height: "80px" }}
            >
              <Selector
                label="Choose floor"
                value={floor || ""}
                errorMsg={errors.floor}
                menuItems={menuItemsFloor}
                dataTestId="selector-floor"
                onChange={handleChangeFloor}
              />
              <Selector
                label="Choose room"
                value={roomId?.toString() || ""}
                errorMsg={errors.roomId}
                disabled={!floor}
                menuItems={menuItemsRoom}
                dataTestId="selector-room"
                onChange={handleChangeRoom}
              />
            </Box>
            <Box
              sx={{ mb: "20px", display: "flex", gap: "15px", height: "80px" }}
            >
              <DateAndTimePicker
                date={start}
                errorMsg={errors.start}
                onChange={handleChangeStart}
                onAccept={handleCloseStart}
                label="Start"
              />
              <DateAndTimePicker
                date={end}
                onAccept={handleCloseEnd}
                minDate={start}
                errorMsg={errors.end}
                onChange={handleChangeEnd}
                label="End"
              />
            </Box>
            <SelectorMultiple
              value={daysOfWeek}
              dataTestId="selector-multiple"
              label="Days of week"
              daysOfWeek={daysOfTheWeek}
              onChange={handleChangeWeek}
            />
          </Grid>
          <Grid item xs={6}>
            <InviteCoworkers />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "50px" }}
            >
              {edit && (
                <Button
                  type="button"
                  dataTestId="button-delete"
                  onclick={() => setOpenConfirmation(true)}
                >
                  Delete
                </Button>
              )}
              <Button
                disabled={Boolean(Object.values(errors).join(""))}
                type="submit"
                onclick={() => {}}
                dataTestId="button-submit"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ConfirmDialog
        open={openConfirmation}
        message="Do you want to delete event"
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
    </>
  );
};

export default BookingForm;
