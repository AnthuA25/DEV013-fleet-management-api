export interface LocationHistory {
    latitude: number | null;
    longitude: number | null;
    date: Date | null;
}

export interface LastLocation {
    id: number;
    date: Date;
    latitude: number;
    longitude: number;
}

export interface ITrajectory {
    id?: number
    taxiId?: number
    date?: Date | null
    latitude?: number | null
    longitude?: number | null
}