import React, { useState } from "react";
import { SelectChangeEvent, Typography, Box, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DateAndTimePicker from "components/date-time-picker";
import ConfirmDialog from "components/confirm-dialog";
import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks";
import {
  setFloor,
  setBookingError,
} from "redux/slices/booking.slice";
import InviteCoworkers from "./invite-coworkers/InviteCoworkers";
import { daysOfTheWeek } from "constants/booking-form";
import SelectorMultiple from "./selector/SelectorMultiple";
import SelectorFloorAndRoom from "components/selector-floor-and-room/SelectorFloorAndRoom";
import { bookingSchema } from "validators/booking";
import Input from "components/UI/input";
import ButtonMI from "components/UI/button";
import { FormValues } from "interfaces/Booking";

interface BookingFormProps {
  edit: boolean;
  handleSubmit: (data: FormValues) => void;
  handleRemoveEvent?: () => void;
}

const BookingForm = ({
  edit,
  handleSubmit,
  handleRemoveEvent = () => { },
}: BookingFormProps) => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { title, start, end, floor, errors, description, roomId, daysOfWeek, invitedId } =
    useAppSelector((state) => state.booking);

  const onConfirm = () => {
    handleRemoveEvent();
    setOpenConfirmation(false);
  };
  const onDismiss = () => {
    setOpenConfirmation(false);
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit: Submit,
    formState: { errors: Error, isDirty }
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      title,
      description,
      dateStart: start,
      dateEnd: end,
      selectRoom: roomId?.toString() || '',
      selectDays: daysOfWeek || [],
      iviteCoworkers: invitedId,
    }
  });

  const handleChangeFloor = (e: SelectChangeEvent<string>) => {
    dispatch(setFloor(e.target.value));
    dispatch(setBookingError({ floor: "" }));
    setValue('selectRoom', '')
  };

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
        sx={{ display: "flex", flexDirection: "column", p: "20px" }}
        component="form"
        onSubmit={Submit(handleSubmit)}
        autoComplete="off"
      >
        <Grid container
          spacing={3}>
          <Grid item width={470} xs={6}>
            <Box sx={{ mb: "25px", height: "75px" }}>
              <Controller
                name="title"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    error={Boolean(Error.title)}
                    autoFocus
                    label="Title"
                    data-testid="input-title"
                    fullWidth
                    helperText={Error.title?.message}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                mb: "25px",
                height: "120px",
              }}
            >
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    data-testid="input-description"
                    error={Boolean(Error.description)}
                    helperText={Error.description?.message}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "15px", height: "80px" }}>
              <Controller
                name="dateStart"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DateAndTimePicker
                    label="Start"
                    date={value}
                    errorMsg={Error.dateStart?.message ? Error.dateStart.message : ''}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="dateEnd"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DateAndTimePicker
                    errorMsg={Error.dateEnd?.message ? Error.dateEnd.message : ''}
                    label="End"
                    minDate={watch('dateStart')}
                    date={value}
                    onChange={onChange}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item width={470} xs={6}>
            <Box
              sx={{
                mb: "21px",
                display: "flex",
                gap: "15px",
                height: "80px",
              }}
            >
              <Controller
                name="selectDays"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectorMultiple
                    value={value}
                    dataTestId="selector-multiple"
                    label="Days of week"
                    daysOfWeek={daysOfTheWeek}
                    onChange={onChange}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: "25px", height: "120px", }}>
              <Controller
                name="iviteCoworkers"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InviteCoworkers edit={edit} value={value} onChange={onChange} />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                height: "80px",
              }}
            >
              <Controller
                name="selectRoom"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectorFloorAndRoom
                    edit={edit}
                    valueFloor={floor}
                    valueRoom={value}
                    onChangeFloor={handleChangeFloor}
                    onChangeRoom={onChange}
                    errorFloor={errors.floor || ''}
                    errorRoom={Error.selectRoom?.message ? Error.selectRoom.message : ''}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "50px" }}
            >
              {edit && (
                <ButtonMI
                  sx={{ color: 'red' }}
                  size='large'
                  data-testid="button-delete"
                  onClick={() => setOpenConfirmation(true)}
                >
                  Delete
                </ButtonMI>
              )}
              <ButtonMI
                size='large'
                disabled={!isDirty}
                type="submit"
                data-testid="button-submit"
              >
                Save
              </ButtonMI>
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
