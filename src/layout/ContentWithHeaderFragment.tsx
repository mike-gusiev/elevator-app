import React from "react";
import styled from "@emotion/styled";

export interface ContentWithHeaderFragmentProps {
    children: [header: React.ReactElement, content: React.ReactElement];
}

export function ContentWithHeaderFragment({ children }: ContentWithHeaderFragmentProps) {
    const [header, content] = children;

    return (
        <Wrapper>
            <div>{header}</div>
            <div>{content}</div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
