import usePassword from "@/stores/password";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const PasswordFilters = () => {
	const uppercase = usePassword((state) => state.passwordFilters.uppercase);
	const lowercase = usePassword((state) => state.passwordFilters.lowercase);
	const numbers = usePassword((state) => state.passwordFilters.numbers);
	const symbols = usePassword((state) => state.passwordFilters.symbols);
	const changeFilters = usePassword((state) => state.changeFilters);
	return (
		<div className="flex flex-col space-y-2.5">
			<Label>Includes:</Label>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="flex space-x-1.5">
					<Switch
						id="uppercase"
						name="uppercase"
						checked={uppercase}
						onCheckedChange={(checked) => {
							changeFilters("uppercase", checked);
						}}
					/>
					<Label htmlFor="uppercase">Uppercase</Label>
				</div>
				<div className="flex space-x-1.5">
					<Switch
						id="lowercase"
						name="lowercase"
						checked={lowercase}
						onCheckedChange={(checked) => {
							changeFilters("lowercase", checked);
						}}
					/>
					<Label htmlFor="lowercase">Lowercase</Label>
				</div>
				<div className="flex space-x-1.5">
					<Switch
						id="numbers"
						name="numbers"
						checked={numbers}
						onCheckedChange={(checked) => {
							changeFilters("numbers", checked);
						}}
					/>
					<Label htmlFor="numbers">Numbers</Label>
				</div>
				<div className="flex space-x-1.5">
					<Switch
						id="symbols"
						name="symbols"
						checked={symbols}
						onCheckedChange={(checked) => {
							changeFilters("symbols", checked);
						}}
					/>
					<Label htmlFor="symbols">Symbols</Label>
				</div>
			</div>
		</div>
	);
};
export default PasswordFilters;
