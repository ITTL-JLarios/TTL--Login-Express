import pkg from 'bcryptjs';
const { genSalt, hash, compare } = pkg;
export const hashPassword = async (password) => {
    const salt = await genSalt(10);
    return hash(password, salt);
};
export const comparePassword = async (password, hashedPassword) => compare(password, hashedPassword);
