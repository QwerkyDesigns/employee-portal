import EnvironmentVariableDoesNotExistError from "../errors/application-errors/EnvironmentVariableDoesNotExistError";
import EnvironmentVarialbeNotParsedCorrectlyError from "../errors/application-errors/EnvironmentVarialbeNotParsedCorrectlyError";
import { EnvironmentVariable } from "./EnvironmentVariable";

class Environment {
    public GetIntEnvironementVariable(variable: EnvironmentVariable): number {
        const rawValue = this.GetEnvironmentVariable(variable);
        try {
            const value = parseInt(rawValue);
            return value;
        } catch {
            throw new EnvironmentVarialbeNotParsedCorrectlyError(`The variable ${variable} is not an int`);
        }
    }

    public GetStringEnvironmentVarialble(variable: EnvironmentVariable) {
        const rawValue = this.GetEnvironmentVariable(variable);
        const value = rawValue.toString();
        return value;
    }

    private GetEnvironmentVariable(variable: EnvironmentVariable): string {
        const value = process.env[variable];
        
        // TODO: This is here for debugging the issue with the loading the stripe api key
        console.log("----------");
        console.log("Variable: " + variable);
        console.log("Value: " + value);
        console.log("----------");
        if (value === undefined) {
            throw new EnvironmentVariableDoesNotExistError(
                `Could not find ${variable} amongst the env vars. value was : ${value}`
            );
        }

        return value;
    }
}
const env = new Environment();
export default env;
