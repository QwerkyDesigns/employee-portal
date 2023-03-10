// why cant I @functions...

export const unpackChangeEvent = (target: any) => {
    return function (event: any) {
        event.preventDefault();
        const { value } = event.target;
        target(value);
    };
};
