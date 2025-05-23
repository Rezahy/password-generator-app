import type { SavedPassword } from "@/@types/saved-passwords";
import { generatePasswordFunc } from "@/lib/generate-password";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { encryptPassword } from "@/lib/crypto";
import { wait } from "@/lib/wait";

export type PasswordFiltersType = {
	length: number;
	uppercase: boolean;
	lowercase: boolean;
	numbers: boolean;
	symbols: boolean;
};
export type State = {
	savedPasswords: SavedPassword[];
	generatedPassword: string;
	passwordFilters: PasswordFiltersType;
};

type Actions = {
	generatePassword: () => void;
	savePassword: (title: string) => void;
	changeFilters: (
		filterName: keyof PasswordFiltersType,
		newValue: PasswordFiltersType[keyof PasswordFiltersType]
	) => void;
	deleteSavedPassword: (id: string) => Promise<void>;
};

const usePassword = create<State & Actions>()(
	persist(
		(set, get) => ({
			savedPasswords: [],
			generatedPassword: "",
			passwordFilters: {
				length: 12,
				lowercase: true,
				uppercase: true,
				numbers: true,
				symbols: true,
			},
			generatePassword: () => {
				const password = generatePasswordFunc(get().passwordFilters);
				if (password.length > 0) {
					set(() => ({ generatedPassword: password }));
				}
			},
			savePassword: (title) => {
				const newPassword: SavedPassword = {
					id: uuidv4(),
					title,
					hashedPassword: encryptPassword(get().generatedPassword),
				};
				set((state) => ({
					savedPasswords: [newPassword, ...state.savedPasswords],
				}));
			},
			changeFilters: (filterName, newValue) => {
				const filters = get().passwordFilters;
				// checked at least one filter should be true value
				const trueFilters = Object.values(filters).filter(
					(item) => item === true
				);
				if (
					filterName !== "length" &&
					newValue === false &&
					trueFilters.length === 1
				) {
					return;
				}
				set((state) => ({
					passwordFilters: { ...state.passwordFilters, [filterName]: newValue },
				}));
			},
			deleteSavedPassword: async (id) => {
				await wait(3000);
				set((state) => ({
					savedPasswords: state.savedPasswords.filter((p) => p.id !== id),
				}));
			},
		}),
		{
			name: "@password-generator-app:password-state-1.0.0",
			version: 1,
			partialize: (state) => ({ savedPasswords: state.savedPasswords }),
		}
	)
);

export default usePassword;
