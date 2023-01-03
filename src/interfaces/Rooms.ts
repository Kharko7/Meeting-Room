export interface Devices {
  deviceId: number;
  name: string;
}

interface Office {
  address: string;
  floors: number;
  name: string;
  officeId: number;
}
export interface Rooms {
  roomId: number;
  name: string;
  floor: number;
  capacity: number;
  office_FK: number;
  devices: Devices[];
  office: Office
}

export interface RoomsSuccessPayload {
  floors: number[];
  rooms: Record<string, Rooms[]>;
}