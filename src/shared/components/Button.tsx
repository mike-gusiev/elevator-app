import styled from "@emotion/styled";

export const Button = styled.button<{ size?: "default" | "small" }>`
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    color: ${({ theme }) => theme.colors.textWhite};
    padding: ${({ theme, size }) =>
        size !== "small" ? `12px ${theme.paddings.default}` : `6px ${theme.paddings.small}`};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    font-size: ${({ theme }) => theme.fontSize.fontSize};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.selected};
    }
`;
