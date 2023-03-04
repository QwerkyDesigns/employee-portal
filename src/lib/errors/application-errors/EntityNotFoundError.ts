class EntityNotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default EntityNotFoundError;
