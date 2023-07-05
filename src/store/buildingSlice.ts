import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app-state";
import { Building } from "../services";
import { selectElevators } from "./elevatorSlice";

export type BuildingsState = Building[];

const initialState: BuildingsState = [
    {
        id: 1,
        name: "Shopping Center",
        floorCount: 17,
        elevatorIds: [1, 2]
    },
    {
        id: 2,
        name: "Business center",
        floorCount: 17,
        elevatorIds: [3]
    },
    {
        id: 3,
        name: "Multistory house",
        floorCount: 23,
        elevatorIds: [4, 5]
    }
];

export const buildingsSlice = createSlice({
    name: "buildings",
    initialState,
    reducers: {
        addBuilding: (state, action: PayloadAction<Building>) => {
            return [...state, action.payload];
        },
        removeBuilding: (state, action: PayloadAction<{ id: number }>) => {
            return state.filter((el) => el.id !== action.payload.id);
        }
    }
});

export const { addBuilding, removeBuilding } = buildingsSlice.actions;

export const selectBuildings = (state: RootState) =>
    state.buildings.map((el) => ({ ...el, elevators: selectElevators(state, el.elevatorIds) }));

export const selectLastBuildingId = (state: RootState) => state.buildings[state.buildings.length - 1]?.id ?? 1;

export const buildingsReducer = buildingsSlice.reducer;
