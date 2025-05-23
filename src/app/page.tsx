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
import { Copy } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import usePassword from "@/stores/password";
import PasswordSlider from "@/components/password-slider";
import PasswordFilters from "@/components/password-filters";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

const HomePage = () => {
	const generatedPassword = usePassword((state) => state.generatedPassword);
	const generatePassword = usePassword((state) => state.generatePassword);
	const copyToClipboard = () => {
		if (generatedPassword) {
			copy(generatedPassword);
			toast.success("Copied to clipboard");
		}
	};

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
							<Input readOnly value={generatedPassword} />
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											size="icon"
											onClick={copyToClipboard}
										>
											<Copy />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Copy to clipboard</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<PasswordSlider />
						<PasswordFilters />
					</div>
				</section>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" onClick={generatePassword}>
					Generate
				</Button>
				<ResponsiveDialog />
			</CardFooter>
		</Card>
	);
};

export default HomePage;

const ResponsiveDialog = () => {
	const titleInputRef = useRef<HTMLInputElement | null>(null);
	const [open, setOpen] = useState(false);
	const generatedPassword = usePassword((state) => state.generatedPassword);
	const savePassword = usePassword((state) => state.savePassword);
	const savePasswordHandler = () => {
		const title = titleInputRef.current?.value;
		if (title) {
			savePassword(title);
			toast.success("Saved Successfully");
			setOpen(false);
			return;
		}
		toast.error("Please Enter a title");
	};
	const isDesktop = useMediaQuery("(min-width: 768px)");
	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button disabled={!generatedPassword}>Save</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Save Password</DialogTitle>
						<DialogDescription>
							Add your title for password. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-2">
						<Label htmlFor="title" className="text-right">
							Password Title
						</Label>
						<Input id="title" className="col-span-3" ref={titleInputRef} />
					</div>
					<DialogFooter className="flex justify-between w-full">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onClick={savePasswordHandler}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button disabled={!generatedPassword}>Save</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Save Password</DrawerTitle>
					<DrawerDescription>
						Add your title for password. Click save when you're done.
					</DrawerDescription>
				</DrawerHeader>
				<div className="space-y-2 px-4">
					<Label htmlFor="title" className="text-right">
						Password Title
					</Label>
					<Input id="title" className="col-span-3" ref={titleInputRef} />
				</div>
				<DrawerFooter className="pt-2">
					<Button onClick={savePasswordHandler}>Save</Button>
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
