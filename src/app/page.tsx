import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";

const HomePage = () => {
	return (
		<Card className="my-7 max-w-xl mx-auto">
			<CardHeader>
				<CardTitle>Password Generator App</CardTitle>
				<CardDescription>Manage your passwords</CardDescription>
			</CardHeader>
			<CardContent>
				<section>
					<div className="grid w-full items-center gap-4">
						<div className="flex space-x-1.5">
							<Input readOnly value="hello world" />
							<Button variant="outline" size="icon">
								<Copy />
							</Button>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="length">Password Length</Label>
							<div className="flex space-x-2">
								<Input
									id="length"
									type="number"
									className="w-1/8 min-w-[70px]"
									min={1}
									max={50}
									step={1}
									defaultValue={1}
								/>
								<Slider defaultValue={[33]} max={50} step={1} min={1} />
							</div>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label>Includes:</Label>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div className="flex space-x-1.5">
									<Switch id="uppercase" />
									<Label htmlFor="uppercase">Uppercase</Label>
								</div>
								<div className="flex space-x-1.5">
									<Switch id="lowercase" />
									<Label htmlFor="lowercase">Lowercase</Label>
								</div>
								<div className="flex space-x-1.5">
									<Switch id="numbers" />
									<Label htmlFor="numbers">Numbers</Label>
								</div>
								<div className="flex space-x-1.5">
									<Switch id="symbols" />
									<Label htmlFor="symbols">Symbols</Label>
								</div>
							</div>
						</div>
					</div>
				</section>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">Generate</Button>
				<Button>Save</Button>
			</CardFooter>
		</Card>
	);
};

export default HomePage;
