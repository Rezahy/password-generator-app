import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import usePassword from "@/stores/password";
import copy from "copy-to-clipboard";
import { Copy, EllipsisVertical, Eye, EyeOff, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type SavedPasswordProps = {
	id: string;
	title: string;
	password: string;
};
const SavedPassword = ({ title, password, id }: SavedPasswordProps) => {
	const [show, setShow] = useState(false);
	const deleteSavedPassword = usePassword((state) => state.deleteSavedPassword);
	const toggleShow = () => {
		setShow((prev) => !prev);
	};
	const copyToClipboard = () => {
		copy(password);
		toast.success("Copied to clipboard");
	};
	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				<CardTitle>{title}</CardTitle>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative left-4">
							<EllipsisVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={deleteSavedPassword.bind(null, id)}>
							<Trash />
							Delete
						</DropdownMenuItem>
						<DropdownMenuItem onClick={copyToClipboard}>
							<Copy />
							Copy
						</DropdownMenuItem>
						<DropdownMenuItem onClick={toggleShow}>
							{show ? (
								<>
									<EyeOff />
									Hide
								</>
							) : (
								<>
									<Eye />
									Show
								</>
							)}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<CardContent>
				<div className="flex items-center space-x-2">
					<Input
						type="text"
						value={password}
						readOnly
						className={cn({ "blur-xs": !show })}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
export default SavedPassword;
