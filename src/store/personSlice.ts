import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../app-state";
import { Person, PersonElevatorStatus } from "../services";

const createPerson = (id: number) => ({ id, waitingForElevator: null });

export interface PersonState {
    currentPersonId: number;
    all: Person[];
}

const initialState: PersonState = {
    currentPersonId: 1,
    all: [createPerson(1)]
};

export const personSlice = createSlice({
    name: "person-state",
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<{ id: number }>) => {
            state = { ...state, all: [...state.all, createPerson(action.payload.id)] };
            return state;
        },
        updatePersonWaitingStatus: (
            state,
            action: PayloadAction<{
                id: number;
                elevatorId: number;
                targetFloor: number;
                waitingStatus: PersonElevatorStatus;
            }>
        ) => {
            const { id, elevatorId, targetFloor, waitingStatus } = action.payload;

            state.all = state.all.map((person) =>
                person.id !== id
                    ? person
                    : { ...person, waitingForElevator: { elevatorId, targetFloor, waitingStatus } }
            );

            return state;
        },
        removePerson: (state, action: PayloadAction<{ id: number }>) => {
            state = { ...state, all: state.all.filter((el) => el.id !== action.payload.id) };
            return state;
        },
        changeCurrentPerson: (state, action: PayloadAction<{ id: number }>) => {
            state = { ...state, currentPersonId: action.payload.id };
            return state;
        }
    }
});

export const { addPerson, removePerson, changeCurrentPerson, updatePersonWaitingStatus } = personSlice.actions;

export const selectPersonInfo = (state: RootState) => state.persons;

export const selectCurrentPerson = (state: RootState) =>
    state.persons.all.find((el) => el.id === state.persons.currentPersonId);

export const personReducer = personSlice.reducer;
