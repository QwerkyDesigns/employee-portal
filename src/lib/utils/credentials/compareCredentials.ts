var bcrypt = require('bcryptjs');
import hashPassword from './hash';

export async function compareCredentials(providedPassword: string, storedHashedPassword: string) {
    const result = await bcrypt.compare(hashPassword(providedPassword),storedHashedPassword);
    return result;
}
