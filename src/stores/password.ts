import type { SavedPassword } from "@/@types/saved-passwords";
import { generatePasswordFunc } from "@/lib/generate-password";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

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
};

const usePassword = create<State & Actions>()(
	persist(
		(set, get) => ({
			savedPasswords: [],
			generatedPassword: "",
			passwordFilters: {
				length: 1,
				lowercase: false,
				numbers: false,
				symbols: false,
				uppercase: false,
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
					password: get().generatedPassword,
				};
				set((state) => ({
					savedPasswords: [newPassword, ...state.savedPasswords],
				}));
			},
			changeFilters: (filterName, newValue) => {
				set((state) => ({
					passwordFilters: { ...state.passwordFilters, [filterName]: newValue },
				}));
			},
		}),
		{ name: "@password-generator-app:password-state-1.0.0", version: 1 }
	)
);

export default usePassword;
