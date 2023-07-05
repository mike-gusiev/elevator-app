import { delay, put, select, spawn, takeEvery } from "redux-saga/effects";

import { callElevator, selectElevatorsByBuildingId, updateElevatorInfo } from "./elevatorSlice";
import { Elevator } from "../services";
import { RootState } from "../app-state";
import { updatePersonWaitingStatus } from "./personSlice";
import { getTotalFloorsCount } from "../helpers";

interface ElevatorQueue {
    [elevatorId: string]: number[];
}

const elevatorQueues: ElevatorQueue = {};

const findClosestElevator = (elevators: Elevator[]): Elevator | null =>
    elevators.reduce<Elevator | null>((acc, el) => {
        if (!acc) return el;

        const prevQueue = elevatorQueues[acc.id];
        const newQueue = elevatorQueues[el.id];

        if (!prevQueue) return acc;
        if (!newQueue) return el;

        return getTotalFloorsCount(prevQueue) < getTotalFloorsCount(newQueue) ? acc : el;
    }, null);

function* updateElevatorSaga(elevator: Elevator, newTargetFloor?: number): Generator<unknown, void, unknown> {
    const queue = elevatorQueues[elevator.id] || [];

    if (newTargetFloor) {
        queue.push(newTargetFloor);
        elevatorQueues[elevator.id] = queue;
    }

    if (queue.length === 0) return;

    const currentTargetFloor = queue[0];

    if (currentTargetFloor === elevator.currentFloor) {
        queue.shift();
        elevatorQueues[elevator.id] = queue;
        yield put(updateElevatorInfo({ ...elevator, movingStatus: "idle" }));
        return;
    }

    const isMovingUp = elevator.currentFloor < currentTargetFloor;

    const newCurrentFloor = isMovingUp ? elevator.currentFloor + 1 : elevator.currentFloor - 1;

    const updatedElevatorData: Elevator = {
        ...elevator,
        currentFloor: newCurrentFloor,
        targetFloor: currentTargetFloor,
        movingStatus: isMovingUp ? "up" : "down"
    };

    yield delay(1000);

    yield put(updateElevatorInfo(updatedElevatorData));

    yield* updateElevatorSaga(updatedElevatorData);
}

export function* watchElevatorControllSaga() {
    yield takeEvery(callElevator.type, function* (action: ReturnType<typeof callElevator>) {
        const { buildingId, newTargetFloor, personId } = action.payload;

        const allElevators: Elevator[] = yield select((state: RootState) =>
            selectElevatorsByBuildingId(state, buildingId)
        );
        const elevator = findClosestElevator(allElevators);

        if (!elevator) {
            alert("This building does not have elevators");
            return;
        }

        yield put(updatePersonWaitingStatus({ id: personId, targetFloor: newTargetFloor, elevatorId: elevator.id }));
        yield spawn(updateElevatorSaga, elevator, newTargetFloor);
    });
}
