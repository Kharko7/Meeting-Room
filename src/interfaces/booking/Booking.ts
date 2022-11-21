interface ExtendedProps {
    roomId: number | null;
    bookingId: number;
    description: string,
    invitedId?: number[],
    daysOfWeek?: string[],
    isRecurring: boolean,
    recurringId: boolean | null
}

export interface BookingEvent {
    title: string,
    start: string,
    end: string,
    extendedProps: ExtendedProps,
}

export interface OneBooking {
    bookingId?: number;
    title: string,
    description: string,
    roomId: number,
    startDateTime: string,
    endDateTime: string,
    invitations: number[],
}

export interface RcurringBooking {
    recurringId?: number
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