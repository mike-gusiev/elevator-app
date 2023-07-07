import React from "react";
import styled from "@emotion/styled";

import { BuildingCard } from ".";
import { Building, Elevator, PersonElevatorStatus } from "../services";

export interface BuildingPersonElevatorStatus extends Omit<Building, "elevators"> {
    elevator?: Elevator;
    personStatus?: PersonElevatorStatus;
}

interface PersonBuildingListProps {
    buildingList: BuildingPersonElevatorStatus[];
    onCallElevator: (buildingId: number, targetFloor: number) => void;
    onRemoveBuilding: (building: Building) => void;
}

export const PersonBuildingList: React.FC<PersonBuildingListProps> = ({
    buildingList,
    onCallElevator,
    onRemoveBuilding
}) => (
    <BuildingListWrapper>
        {buildingList.map((item) => (
            <Item key={item.id}>
                <BuildingCard
                    building={item}
                    onClickFloor={(floor) => onCallElevator(item.id, floor)}
                    onRemoveBuilding={() => onRemoveBuilding(item)}
                />
            </Item>
        ))}
    </BuildingListWrapper>
);

const BuildingListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.paddings.default};
    justify-content: center;
`;

const Item = styled.div`
    flex: 1 1 300px;
    max-width: 600px;
`;
