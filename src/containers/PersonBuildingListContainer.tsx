import React from "react";

import { selectCurrentPerson, callElevator, removeElevators, removeBuilding, selectBuildings } from "../store";
import { BuildingPersonElevatorStatus, PersonBuildingList } from "../components";
import { useAppDispatch, useAppSelector } from "../shared";
import { Building, Elevator } from "../services";

export type BuildingWithElevators = Building & { elevators: Elevator[] };

export const PersonBuildingListContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const buildingList = useAppSelector(selectBuildings);
    const currentPerson = useAppSelector(selectCurrentPerson);

    const normalizedInfo: BuildingPersonElevatorStatus[] = buildingList.map((el) => {
        const { elevators, ...baseInfo } = el;

        const elevator = elevators.find(
            (buildingElevator: Elevator) => currentPerson?.waitingForElevator?.elevatorId === buildingElevator.id
        );

        if (elevator) {
            return { ...baseInfo, elevator, personStatus: currentPerson?.waitingForElevator?.waitingStatus };
        }

        return baseInfo;
    });

    const handleOnCallElevator = (buildingId: number, newTargetFloor: number) => {
        const personId = currentPerson?.id;

        if (!personId) {
            alert("Oops, it seems you have deleted the selected person. Please select a new person.");
            return;
        }

        dispatch(callElevator({ newTargetFloor, buildingId, personId }));
    };

    const handleOnRemoveBuiling = (building: Building) => {
        dispatch(removeBuilding({ id: building.id }));
        dispatch(removeElevators({ ids: building.elevatorIds }));
    };

    return (
        <PersonBuildingList
            buildingList={normalizedInfo}
            onCallElevator={handleOnCallElevator}
            onRemoveBuilding={handleOnRemoveBuiling}
        />
    );
};
