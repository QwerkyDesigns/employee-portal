export const unpackChangeEvent = (target: any) => {
    return function (event: any) {
        const { value } = event.target;
        target(value);
    };
};
