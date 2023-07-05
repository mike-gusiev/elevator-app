import React from "react";
import styled from "@emotion/styled";

interface HeaderProps {
    children: JSX.Element | string;
}

export const Header: React.FC<HeaderProps> = ({ children }) => (
    <HeaderWrapper>
        <h1>Elevators Controls</h1>
        {children}
    </HeaderWrapper>
);

const HeaderWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.paddings.default};
`;
