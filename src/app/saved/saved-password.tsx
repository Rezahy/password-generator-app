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
import copy from "copy-to-clipboard";
import { Copy, EllipsisVertical, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { decryptPassword } from "@/lib/crypto";
import DeletePasswordButton from "./delete-password-button";

type SavedPasswordProps = {
	id: string;
	title: string;
	hashedPassword: string;
};
const SavedPassword = ({ title, hashedPassword, id }: SavedPasswordProps) => {
	const [show, setShow] = useState(false);
	const toggleShow = () => {
		setShow((prev) => !prev);
	};
	const copyToClipboard = () => {
		copy(decryptPassword(hashedPassword));
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
						<DeletePasswordButton id={id} />
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
						value={decryptPassword(hashedPassword)}
						readOnly
						className={cn({ "blur-xs": !show })}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
export default SavedPassword;
