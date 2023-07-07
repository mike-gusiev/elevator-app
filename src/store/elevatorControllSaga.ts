import { delay, put, select, spawn, takeEvery } from "redux-saga/effects";

import { callElevator, selectElevatorsByBuildingId, updateElevatorInfo } from "./elevatorSlice";
import { Elevator } from "../services";
import { RootState } from "../app-state";
import { updatePersonWaitingStatus } from "./personSlice";
import { getTotalFloorsCount } from "../helpers";

interface ElevatorQueue {
    [elevatorId: string]: { targetFloor: number; personId: number }[];
}

const elevatorQueues: ElevatorQueue = {};

const findClosestElevator = (elevators: Elevator[]): Elevator | null =>
    elevators.reduce<Elevator | null>((acc, el) => {
        if (!acc) return el;

        const prevQueue = elevatorQueues[acc.id]?.map((el) => el.targetFloor);
        const newQueue = elevatorQueues[el.id]?.map((el) => el.targetFloor);

        if (!prevQueue) return acc;
        if (!newQueue) return el;

        return getTotalFloorsCount(prevQueue) < getTotalFloorsCount(newQueue) ? acc : el;
    }, null);

function* updateElevatorSaga(
    elevator: Elevator,
    personId: number,
    newTargetFloor?: number
): Generator<unknown, void, unknown> {
    const queue = elevatorQueues[elevator.id] || [];

    if (newTargetFloor) {
        queue.push({ targetFloor: newTargetFloor, personId });
        elevatorQueues[elevator.id] = queue;
    }

    if (queue.length === 0) return;

    const currentElevatorStatus = queue[0];

    if (currentElevatorStatus.targetFloor === elevator.currentFloor) {
        queue.shift();
        elevatorQueues[elevator.id] = queue;
        yield put(updateElevatorInfo({ ...elevator, movingStatus: "idle" }));

        yield put(
            updatePersonWaitingStatus({
                id: personId,
                targetFloor: currentElevatorStatus.targetFloor,
                elevatorId: elevator.id,
                waitingStatus: "arrived"
            })
        );

        return;
    }

    const isMovingUp = elevator.currentFloor < currentElevatorStatus.targetFloor;

    const newCurrentFloor = isMovingUp ? elevator.currentFloor + 1 : elevator.currentFloor - 1;

    const updatedElevatorData: Elevator = {
        ...elevator,
        currentFloor: newCurrentFloor,
        targetFloor: currentElevatorStatus.targetFloor,
        movingStatus: isMovingUp ? "up" : "down"
    };

    yield delay(1000);

    yield put(updateElevatorInfo(updatedElevatorData));

    yield* updateElevatorSaga(updatedElevatorData, personId);
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

        yield put(
            updatePersonWaitingStatus({
                id: personId,
                targetFloor: newTargetFloor,
                elevatorId: elevator.id,
                waitingStatus: "waiting"
            })
        );

        yield spawn(updateElevatorSaga, elevator, personId, newTargetFloor);
    });
}
