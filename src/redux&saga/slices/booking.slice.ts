
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ExtendedProps {
    roomId: number | null;
    floor: string | null;
    bookingId?: number;
    description: string,
    invitedIds: string[],
    daysOfWeek: string[],
    errors: Record<string, string>,
}

export interface InitialStateBookig {
    title: string,
    start: string,
    end: string,
    extendedProps: ExtendedProps,
}

const initialState: InitialStateBookig = {
    title: '',
    start: '',
    end: '',
    extendedProps: {
        floor: null,
        roomId: null,
        description: '',
        invitedIds: [],
        errors: {},
        daysOfWeek: [],
    }
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setRoomId(state, action: PayloadAction<number | null>) {
            state.extendedProps.roomId = action.payload;
        },
        setFloor(state, action: PayloadAction<string>) {
            state.extendedProps.floor = action.payload;
        },
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.extendedProps.description = action.payload;
        },
        setStart(state, action: PayloadAction<string>) {
            state.start = action.payload;
        },
        setEnd(state, action: PayloadAction<string>) {
            state.end = action.payload;
        },
        setSelectedDate(state, action: PayloadAction<Record<string, string>>) {
            state.start = action.payload.start;
            state.end = action.payload.end;
        },
        setBookingError(state, action: PayloadAction<Record<string, string>>) {
            state.extendedProps.errors = { ...state.extendedProps.errors, ...action.payload };
        },
        setDaysOfWeek(state, action: PayloadAction<string[]>) {
            state.extendedProps.daysOfWeek = action.payload;
        },
        editBooking(state, action: PayloadAction<any>) {
            state.title = action.payload.title;
            state.start = action.payload.start;
            state.end = action.payload.end;
            state.extendedProps.roomId = action.payload.roomId;
            state.extendedProps.description = action.payload.description;
            state.extendedProps.daysOfWeek = action.payload.daysOfWeek;
            state.extendedProps.floor = action.payload.floor;

        },
        resetState() {
            return { ...initialState };
        },
    },
});
export const bookingActions = bookingSlice.actions;

const bookingReducer = bookingSlice.reducer;

export default bookingReducer;
