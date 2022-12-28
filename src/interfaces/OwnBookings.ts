export interface Invitations {
  invitationId: number;
  invitedId_FK: number;
}
export interface BookingResponse {
  bookingId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  isRecurring: boolean;
  creatorId_FK: number;
  room_FK: number;
  invitations: Invitations[];
  daysOfWeek: null | string[]
}
export interface Booking {
  title: string;
  start: string;
  end: string;
  bookingId: number;
  description: string;
  isRecurring: boolean;
  creatorId: number;
  roomId: number;
  invitations: Invitations[];
  daysOfWeek: null | string[]
}

export interface GetOwnBookingsPayload {
  page: number;
}

export interface GetOwnBookingsSuccessPayload {
  bookings: Booking[];
  totalCount: number;
}