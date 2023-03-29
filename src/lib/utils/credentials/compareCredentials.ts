import bcrypt from 'bcrypt';
import hashPassword from './hash';

export async function compareCredentials(providedPassword: string, storedHashedPassword: string) {
    const result = await bcrypt.compare(storedHashedPassword, hashPassword(providedPassword));
    return result;
}
