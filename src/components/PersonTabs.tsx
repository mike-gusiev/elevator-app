import React from "react";
import styled from "@emotion/styled";

import { Person } from "../services";

interface PersonTabsProps {
    data: Person[];
    currentPersonId: number;
    onSelectPerson: (id: number) => void;
    onRemovePerson: (id: number) => void;
    onClickAdd: () => void;
}

export const PersonTabs: React.FC<PersonTabsProps> = ({
    data,
    currentPersonId,
    onSelectPerson,
    onRemovePerson,
    onClickAdd
}) => (
    <div>
        <TabsContainer>
            {data.map((el) => (
                <TabItem
                    className={el.id === currentPersonId ? "active" : ""}
                    key={el.id}
                    onClick={() => onSelectPerson(el.id)}>
                    <span>
                        Person {el.id} <span onClick={() => onRemovePerson(el.id)}>&#x2715;</span>
                    </span>
                </TabItem>
            ))}
            <TabItem onClick={onClickAdd}>Add</TabItem>
        </TabsContainer>
    </div>
);

const TabsContainer = styled.ul`
    list-style-type: none;
    padding: 0;
    text-align: center;
`;

const TabItem = styled.li`
    display: inline-block;
    background-color: #1d1f20;
    border-bottom: solid 5px ${({ theme }) => theme.colors.selected};
    padding: ${({ theme }) => `${theme.paddings.small} ${theme.paddings.default}`};

    transition: 0.7s all;

    color: #fff;
    cursor: pointer;

    & > span {
        display: inline-flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        gap: ${({ theme }) => theme.paddings.small};
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.selected};
    }

    &.active {
        background-color: ${({ theme }) => theme.colors.selected};
    }

    &:first-child {
        border-radius: ${({ theme }) => `${theme.borderRadius.small} 0 0 ${theme.borderRadius.small}`};
    }
    &:last-child {
        border-radius: ${({ theme }) => `0 ${theme.borderRadius.small} ${theme.borderRadius.small} 0`};
    }
`;
