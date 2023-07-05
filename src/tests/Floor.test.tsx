import { render, fireEvent } from "@testing-library/react";
import { ThemeUIProvider } from "theme-ui";

import Floor from "../components/Floor";
import theme from "../theme";

describe("Floor", () => {
    test("calls onFloorClick callback when clicked", () => {
        const mockOnFloorClick = jest.fn();
        const floorNumber = 1;

        const { getByText } = render(
            <ThemeUIProvider theme={theme}>
                <Floor floorNumber={floorNumber} onFloorClick={mockOnFloorClick} />
            </ThemeUIProvider>
        );

        const floorButton = getByText(floorNumber.toString());
        fireEvent.click(floorButton);

        expect(mockOnFloorClick).toHaveBeenCalledTimes(1);
    });
});
