import React from "react";
import styled from "@emotion/styled";

import { Floor, ElevatorStatusPanel, BuildingPersonElevatorStatus } from ".";

interface BuildingCardProps {
    building: BuildingPersonElevatorStatus;
    onClickFloor: (floor: number) => void;
    onRemoveBuilding: () => void;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, onClickFloor, onRemoveBuilding }) => {
    const floors = Array.from({ length: building.floorCount }, (_, index) => index + 1);

    return (
        <BuildingWrapper>
            <Title>
                <h2>{building.name}</h2>
                <span className="remove" onClick={onRemoveBuilding}>
                    Remove
                </span>
            </Title>
            <ElevatorStatusPanel
                elevatorId={building.elevator?.id}
                movingDirection={building.elevator?.movingStatus}
                currentFloor={building.elevator?.currentFloor}
            />
            <BuildingStyled>
                {floors.map((floor) => (
                    <Floor key={floor} floorNumber={floor} onFloorClick={() => onClickFloor(floor)} />
                ))}
            </BuildingStyled>
        </BuildingWrapper>
    );
};

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: ${({ theme }) => `0px ${theme.paddings.small}`};

    .remove {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.danger};
        font-size: ${({ theme }) => theme.fontSize.fontSize};
    }

    h2 {
        font-size: ${({ theme }) => theme.fontSize.fontSizeLG};
        margin: 0;
    }
`;

const BuildingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.paddings.small};
`;

const BuildingStyled = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.paddings.small};

    & > button {
        flex: 1 1 25%;
    }
`;
