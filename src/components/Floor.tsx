import React from "react";
import styled from "@emotion/styled";

interface FloorProps {
    floorNumber: number;
    onFloorClick: () => void;
}

export const Floor: React.FC<FloorProps> = ({ floorNumber, onFloorClick }) => (
    <FloorButton onClick={onFloorClick}>{floorNumber}</FloorButton>
);

const FloorButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;

    border: none;
    background-color: #ccc;
    color: #000;
    font-family: Arial, sans-serif;
    font-size: ${({ theme }) => theme.fontSize.fontSizeLG};
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: #aaa;
    }

    &:active {
        background-color: #999;
    }
`;
