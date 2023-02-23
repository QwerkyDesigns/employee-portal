import OperatingEnvironmentDoesNotExistError from "../errors/application-errors/OperatingEnvDoesNotExistError";
import env from "./Environment";
import { EnvironmentVariable } from "./EnvironmentVariable";

export enum OperatingEnv {
    dev = "dev",
    staging = "staging",
    production = "production",
}

class CurrentOperatingEnvironment {
    public ResovleInEnviron<T>(
        ifDev?: () => T,
        ifStaging?: () => T,
        ifProd?: () => T
    ): T {
        const currentEnv = this.GetCurrentOperatingEnvironment();
        if (ifDev && currentEnv === OperatingEnv.dev) {
            return ifDev();
        } else if (ifStaging && currentEnv === OperatingEnv.dev) {
            return ifStaging();
        } else if (ifProd && currentEnv === OperatingEnv.dev) {
            return ifProd();
        }
        throw new Error("CurrentOperatingEnvironmentError");
    }

    public GetCurrentOperatingEnvironment(): OperatingEnv {
        const currentOperatingEnvironment = env.GetStringEnvironmentVarialble(
            EnvironmentVariable.OperatingEnvironment
        );

        var currentEnvEnum = this.MatchCurrentEnvironment(
            currentOperatingEnvironment
        );
        return currentEnvEnum;
    }

    private MatchCurrentEnvironment(env: string): OperatingEnv {
        if (env == OperatingEnv.dev) {
            return OperatingEnv.dev;
        } else if (env == OperatingEnv.staging) {
            return OperatingEnv.staging;
        } else if (env == OperatingEnv.production) {
            return OperatingEnv.production;
        } else {
            throw new OperatingEnvironmentDoesNotExistError(
                `Operating environment {env} does not exist / is not valid`
            );
        }
    }
}

const currentOperatingEnvironment = new CurrentOperatingEnvironment();
export default currentOperatingEnvironment;
