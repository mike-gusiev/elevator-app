import React from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface ArrowProps {
    direction: "up" | "down";
    isActive: boolean;
}

export const Arrow: React.FC<ArrowProps> = ({ direction, isActive }) => {
    return (
        <ArrowContainer>
            <ArrowSVG direction={direction} active={isActive.toString()} />
        </ArrowContainer>
    );
};

const blinkAnimation = (color: string) => keyframes`
  0% {
    background-color: grey;
  }

  50% {
    background-color: ${color};
  }

  100% {
    background-color: grey;
  }
`;

const ArrowContainer = styled.div`
    display: inline-block;
`;

const ArrowSVG = styled.div<{ direction: "up" | "down"; active: string }>`
    width: 50px;
    height: 50px;
    background-color: grey;
    border-radius: 50%;
    position: relative;
    &:before {
        width: 6px;
        height: 20px;
        content: "";
        border-radius: 6px;
        background-color: #fff;
        display: block;
        position: absolute;
        top: 10px;
        right: 0;
        left: 0;
        margin: auto;
        transform: rotate(45deg);
    }
    &:after {
        width: 6px;
        height: 20px;
        content: "";
        border-radius: 6px;
        background-color: #fff;
        display: block;
        position: absolute;
        right: 0;
        bottom: 10px;
        left: 0;
        margin: auto;
        transform: rotate(-45deg);
    }

    transform: ${({ direction }) => (direction === "up" ? "rotate(90deg)" : "rotate(-90deg)")};

    ${({ active, direction, theme }) =>
        active === "true" &&
        css`
            animation: ${blinkAnimation(direction === "up" ? theme.colors.success : theme.colors.danger)} 0.8s linear
                infinite;
        `}
`;
