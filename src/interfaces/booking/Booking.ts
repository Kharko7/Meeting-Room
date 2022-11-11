interface ExtendedProps {
    roomId: number | null;
    bookingId: number;
    description: string,
    invitedIds?: number[],
    daysOfWeek?: string[],
}

export interface BookingEvent {
    title: string,
    start: string,
    end: string,
    extendedProps: ExtendedProps,
}

export interface AddOneBooking {
    title: string,
    description: string,
    roomId: number,
    startDateTime: string,
    endDateTime: string,
}

export interface AddRcurringBooking {
    title: string,
    description: string,
    roomId: number,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    daysOfWeek: string[],
}