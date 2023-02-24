class EnvironmentVariableDoesNotExistError extends Error {

  constructor(message: string) {
    super(message);
  }
}

export default EnvironmentVariableDoesNotExistError;
