import { UseFormRegister } from "react-hook-form";
import styled from "@emotion/styled";

import { BuildingFormData } from "../containers";
import { Button } from "../shared";

interface BuildingFormProps {
    register: UseFormRegister<BuildingFormData>;
    onFinish: (form: React.FormEvent<HTMLFormElement>) => void;
}

export const BuildingForm: React.FC<BuildingFormProps> = ({ onFinish, register }) => (
    <form onSubmit={onFinish}>
        <FormLayout>
            <FormItem>
                <label>Building Name:</label>
                <Input {...register("name")} type="text" required />
            </FormItem>
            <FormItem>
                <label>Floor Count:</label>
                <Input {...register("floorCount")} type="number" required />
            </FormItem>
            <FormItem>
                <label>Elevator Count:</label>
                <Input {...register("elevatorCount")} type="number" required />
            </FormItem>
            <FormItem>
                <Button type="submit">Add Building</Button>
            </FormItem>
        </FormLayout>
    </form>
);

const FormLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${({ theme }) => theme.paddings.default};
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    label {
        text-align: start;
        padding-bottom: ${({ theme }) => theme.paddings.small};
        font-size: ${({ theme }) => theme.fontSize.fontSizeLG};
    }
`;

const Input = styled.input`
    font-size: ${({ theme }) => theme.fontSize.fontSize};
    color: ${({ theme }) => theme.colors.textBlack};
    padding: ${({ theme }) => theme.paddings.small};
    width: 100%;
    height: 50px;
    background: ${({ theme }) => theme.colors.backgroundColor};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    border: none;
`;
