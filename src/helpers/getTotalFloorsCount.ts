export const getTotalFloorsCount = (floors: number[] = []): number => {
    if (floors.length === 0) {
        return 0;
    }

    let count = 0;

    for (let i = 1; i < floors.length; i++) {
        const diff = Math.abs(floors[i] - floors[i - 1]);
        count += diff;
    }

    return count + 1;
};
