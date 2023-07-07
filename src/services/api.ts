export interface Building {
    id: number;
    name: string;
    floorCount: number;
    elevatorIds: number[];
}

export type ElevatorMovingStatus = "up" | "down" | "idle";

export interface Elevator {
    id: number;
    buildingId: number;
    movingStatus: ElevatorMovingStatus;
    currentFloor: number;
    targetFloor: number | null;
}

export type PersonElevatorStatus = "arrived" | "waiting";

export interface Person {
    id: number;
    waitingForElevator: {
        targetFloor: number;
        elevatorId: number;
        waitingStatus: PersonElevatorStatus;
    } | null;
}
