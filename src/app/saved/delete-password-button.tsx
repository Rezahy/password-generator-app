import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import usePassword from "@/stores/password";
import { Loader, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type DeletePasswordButtonProps = {
	id: string;
};
const DeletePasswordButton = ({ id }: DeletePasswordButtonProps) => {
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const deleteSavedPassword = usePassword((state) => state.deleteSavedPassword);
	const deletePasswordHandler = () => {
		startTransition(async () => {
			await deleteSavedPassword(id);
			setOpen(false);
			toast.success("password deleted successfully");
		});
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<Trash />
					Delete
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently remove your
						password from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							deletePasswordHandler();
						}}
					>
						{isPending ? <Loader className="animate-spin" /> : "Continue"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
export default DeletePasswordButton;
