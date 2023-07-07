import React from "react";
import styled from "@emotion/styled";

import { Arrow } from "../shared";
import { ElevatorMovingStatus } from "../services";

interface ElevatorStatusPanelProps {
    movingDirection?: ElevatorMovingStatus;
    currentFloor?: number;
    elevatorId?: number;
    personElevatorStatus?: string;
}

export const ElevatorStatusPanel: React.FC<ElevatorStatusPanelProps> = ({
    movingDirection,
    currentFloor,
    elevatorId,
    personElevatorStatus
}) => (
    <div>
        <ElevatorStatusPanelWrapper>
            {elevatorId && <Text>Elevator: {elevatorId}</Text>}
            <CurrentFloor>{currentFloor}</CurrentFloor>
            <ArrowWrapper>
                <Arrow direction="up" isActive={movingDirection === "up"} />
                <Arrow direction="down" isActive={movingDirection === "down"} />
            </ArrowWrapper>
        </ElevatorStatusPanelWrapper>
        <div>{personElevatorStatus ?? ""}</div>
    </div>
);

const Text = styled.p`
    color: ${({ theme }) => theme.colors.textWhite};
    font-size: ${({ theme }) => theme.fontSize.fontSize};
`;

const ElevatorStatusPanelWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: end;
    align-items: center;
    gap: ${({ theme }) => theme.paddings.small};

    color: ${({ theme }) => theme.colors.textWhite};
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: saturate(180%) blur(6px);
    border: solid 1px grey;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: ${({ theme }) => `${theme.paddings.small} ${theme.paddings.default}`};

    div {
        flex: 0 0 33.3%;
    }
`;

const CurrentFloor = styled.div`
    color: ${({ theme }) => theme.colors.textWhite};
    font-size: ${({ theme }) => theme.fontSize.fontSizeHeading1};
    text-align: center;
`;

const ArrowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;
