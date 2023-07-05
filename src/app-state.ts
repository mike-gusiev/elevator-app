import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { buildingsReducer, elevatorsReducer, personReducer, watchElevatorControllSaga } from "./store";

const sagaMiddleware = createSagaMiddleware();

function* appSaga() {
    yield all([watchElevatorControllSaga()]);
}

export const store = configureStore({
    reducer: {
        buildings: buildingsReducer,
        elevators: elevatorsReducer,
        persons: personReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(appSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
