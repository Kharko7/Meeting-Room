interface ExtendedProps {
    roomId: number | null;
    bookingId: number;
    description: string,
    invitedId?: number[],
    daysOfWeek?: string[],
    isRecurring: boolean,
    recurringId: number | null
}

export interface BookingEvent {
    title: string,
    start: string,
    end: string,
    extendedProps: ExtendedProps,
}

export interface OneBooking {
    bookingId?: number | null;
    title: string,
    description: string,
    roomId: number,
    startDateTime: string,
    endDateTime: string,
    invitations: number[],
}

export interface EditBooking {
    bookingId: number | null;
    title: string,
    description: string,
    roomId: number,
    start: string,
    end: string,
    floor: string,
    isRecurring: boolean,
    recurringId: number | null,
}

export interface EditRecurringBooking {
    recurringId: number | null
    title: string,
    description: string,
    roomId: number,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    daysOfWeek: string[],
    invitations: number[],
}

export interface AddRecurringBooking {
    title: string,
    description: string,
    roomId: number,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    daysOfWeek: string[],
    invitations: number[],
}
export interface DeleteBookingInterface {
    id: number;
    isRecurring: boolean;
}