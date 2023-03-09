class OperatingEnvironmentDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default OperatingEnvironmentDoesNotExistError;
