import type { PasswordFiltersType } from "@/stores/password";

export const allCharacters = {
	uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lowercase: "abcdefghijklmnopqrstuvwxyz",
	numbers: "0123456789",
	symbol: "!@#$%^&*=-_",
};

type Option = keyof typeof allCharacters;
export const generatePasswordFunc = (passwordFilters: PasswordFiltersType) => {
	const length = passwordFilters.length;
	const passwordFiltersChecked = Object.entries(passwordFilters)
		.map(([key, value]) => {
			if (value === true) {
				return key;
			}
			return null;
		})
		.filter((key) => key !== null) as Option[];
	const optionStrings = generateStringOfOptions(passwordFiltersChecked);
	return optionStrings.slice(0, length);
};

const generateStringOfOptions = (options: Option[]) => {
	let result = "";

	for (const opt of options) {
		result += allCharacters[opt];
	}
	return result.length > 0 ? shuffle(result) : result;
};

const shuffle = (s: string) => {
	const arr = s.split(""); // Convert String to array

	arr.sort(function () {
		return 0.5 - Math.random();
	});
	s = arr.join(""); // Convert Array to string
	return s; // Return shuffled string
};
