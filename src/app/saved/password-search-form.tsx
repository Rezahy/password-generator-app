import { type FormEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const PasswordSearchForm = () => {
	const searchRef = useRef<HTMLInputElement | null>(null);
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (searchRef.current && searchRef.current.value.trim().length > 0) {
			const value = searchRef.current.value;
			console.log(value);
		}
	};
	return (
		<div className="max-w-md mx-auto relative">
			<form onSubmit={onSubmitHandler}>
				<Input
					placeholder="Search password ..."
					className="pr-9"
					name="search"
					ref={searchRef}
				/>
				<Button
					variant="ghost"
					size="sm"
					className="absolute right-0.5 text-gray-500 top-[50%] -translate-y-[50%]"
				>
					<Search absoluteStrokeWidth size={16} />
				</Button>
			</form>
		</div>
	);
};
export default PasswordSearchForm;
