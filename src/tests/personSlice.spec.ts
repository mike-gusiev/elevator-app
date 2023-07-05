import { configureStore } from "@reduxjs/toolkit";

import { RootState } from "../app-state";
import personReducer, {
    addPerson,
    removePerson,
    changeCurrentPerson,
    updatePersonWaitingStatus,
    PersonState,
    selectPersonInfo
} from "../store/personSlice";

describe("personSlice", () => {
    let store: ReturnType<typeof configureStore>;
    const initialPersonState: PersonState = {
        currentPersonId: 1,
        all: [{ id: 1, waitingForElevator: null }]
    };

    beforeEach(() => {
        store = configureStore({
            reducer: {
                persons: personReducer
            },
            preloadedState: { persons: initialPersonState }
        });
    });

    test("addPerson action adds a person to the state", () => {
        const newPersonId = 2;
        store.dispatch(addPerson({ id: newPersonId }));

        const updatedState = selectPersonInfo(store.getState() as RootState);
        expect(updatedState.all).toHaveLength(2);
        expect(updatedState.all[1].id).toBe(newPersonId);
    });

    test("removePerson action removes a person from the state", () => {
        const personIdToRemove = 1;
        store.dispatch(removePerson({ id: personIdToRemove }));

        const updatedState = selectPersonInfo(store.getState() as RootState);
        expect(updatedState.all).toHaveLength(0);
    });

    test("changeCurrentPerson action updates the currentPersonId in the state", () => {
        const newCurrentPersonId = 2;
        store.dispatch(changeCurrentPerson({ id: newCurrentPersonId }));

        const updatedState = selectPersonInfo(store.getState() as RootState);
        expect(updatedState.currentPersonId).toBe(newCurrentPersonId);
    });

    test("updatePersonWaitingStatus action updates the waiting status of a person", () => {
        const personId = 1;
        const elevatorId = 123;
        const targetFloor = 5;

        store.dispatch(updatePersonWaitingStatus({ id: personId, elevatorId, targetFloor }));

        const updatedState = selectPersonInfo(store.getState() as RootState);
        const updatedPerson = updatedState.all.find((person) => person.id === personId);
        expect(updatedPerson?.waitingForElevator).toEqual({
            elevatorId,
            targetFloor
        });
    });
});
