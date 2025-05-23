import usePassword from "@/stores/password";
import type { ChangeEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

const PasswordSlider = () => {
	const length = usePassword((state) => state.passwordFilters.length);
	const changeFilters = usePassword((state) => state.changeFilters);
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.valueAsNumber;
		changeFilters("length", value);
	};
	return (
		<div className="flex flex-col space-y-1.5">
			<Label htmlFor="length">Password Length</Label>
			<div className="flex space-x-2">
				<Input
					id="length"
					name="length"
					type="number"
					className="w-1/8 min-w-[70px]"
					min={1}
					max={50}
					step={1}
					value={length.toString()}
					onChange={onChangeHandler}
				/>
				<Slider
					max={50}
					step={1}
					min={1}
					value={[length]}
					name="length"
					onValueChange={(v) => changeFilters("length", v[0])}
				/>
			</div>
		</div>
	);
};
export default PasswordSlider;
