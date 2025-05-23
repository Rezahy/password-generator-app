import CryptoJS from "crypto-js";
import { env } from "./env";

export const encryptPassword = (password: string) => {
	return CryptoJS.AES.encrypt(
		password,
		env.VITE_PASSWORD_SECRET_KEY
	).toString();
};

export const decryptPassword = (encryptedPassword: string) => {
	const bytes = CryptoJS.AES.decrypt(
		encryptedPassword,
		env.VITE_PASSWORD_SECRET_KEY
	);
	return bytes.toString(CryptoJS.enc.Utf8);
};
