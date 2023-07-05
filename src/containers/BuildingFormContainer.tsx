import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Modal, Button, useAppDispatch } from "../shared";
import { Building } from "../services";
import { addElevators, selectLastElevatorId, addBuilding, selectLastBuildingId } from "../store";
import { BuildingForm } from "../components";

export type BuildingFormData = Omit<Building, "id" | "elevatorIds"> & { elevatorCount: number };

export const BuildingFormContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset } = useForm<BuildingFormData>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const lastElevatorId = useSelector(selectLastElevatorId);
    const lastBuildingId = useSelector(selectLastBuildingId);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = (data: BuildingFormData) => {
        const { elevatorCount, name, floorCount } = data;

        let currentLastElevatorId = lastElevatorId;
        const newBuildingId = lastBuildingId + 1;

        const elevatorIds = Array.from({ length: elevatorCount }, () => {
            currentLastElevatorId += 1;
            return currentLastElevatorId;
        });

        dispatch(
            addElevators({
                elevators: elevatorIds.map((id) => ({
                    id,
                    buildingId: newBuildingId,
                    movingStatus: "idle",
                    currentFloor: 1,
                    targetFloor: null
                }))
            })
        );

        dispatch(addBuilding({ id: newBuildingId, name, floorCount, elevatorIds }));
        hideModal();
        reset();
    };

    return (
        <>
            <Button onClick={showModal}>Add building</Button>
            <Modal isModalOpen={isModalOpen} title="Add building" onClose={hideModal}>
                <BuildingForm register={register} onFinish={handleSubmit(handleOnFinish)} />
            </Modal>
        </>
    );
};
