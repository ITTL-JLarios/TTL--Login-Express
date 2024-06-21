import pkg from 'bcryptjs';

const { genSalt, hash, compare } = pkg;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => compare(password, hashedPassword);