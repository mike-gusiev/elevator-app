import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../app-state";
import { Elevator } from "../services";

export type ElevatorsState = Elevator[];

const initialState: ElevatorsState = [
    {
        id: 1,
        buildingId: 1,
        movingStatus: "idle",
        currentFloor: 1,
        targetFloor: null
    },
    {
        id: 2,
        buildingId: 1,
        movingStatus: "idle",
        currentFloor: 1,
        targetFloor: null
    },
    {
        id: 3,
        buildingId: 2,
        movingStatus: "idle",
        currentFloor: 1,
        targetFloor: null
    },
    {
        id: 4,
        buildingId: 3,
        movingStatus: "idle",
        currentFloor: 1,
        targetFloor: null
    },
    {
        id: 5,
        buildingId: 3,
        movingStatus: "idle",
        currentFloor: 1,
        targetFloor: null
    }
];

export const elevatorsSlice = createSlice({
    name: "elevators-state",
    initialState,
    reducers: {
        addElevators: (state, action: PayloadAction<{ elevators: Elevator[] }>) => {
            return [...state, ...action.payload.elevators];
        },
        removeElevators: (state, action: PayloadAction<{ ids: number[] }>) => {
            return state.filter((el) => !action.payload.ids.includes(el.id));
        },
        updateElevatorInfo: (state, action: PayloadAction<Elevator>) => {
            const elevator = action.payload;
            state = state.map((el) => (el.id === elevator.id ? elevator : el));
            return state;
        }
    }
});

export const { addElevators, removeElevators, updateElevatorInfo } = elevatorsSlice.actions;

export const callElevator =
    createAction<{ newTargetFloor: number; buildingId: number; personId: number }>("CALL ELEVATOR");

export const selectElevators = (state: RootState, ids: number[]) =>
    state.elevators.filter((el) => ids.some((id) => id === el.id));

export const selectElevatorsByBuildingId = (state: RootState, buildingId: number) =>
    state.elevators.filter((el) => el.buildingId === buildingId);

export const selectLastElevatorId = (state: RootState) => state.elevators[state.elevators.length - 1]?.id ?? 1;

export const elevatorsReducer = elevatorsSlice.reducer;
