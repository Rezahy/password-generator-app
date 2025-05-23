import type { MenuItemLink } from "@/@types/menu-item-link";
import { Save } from "lucide-react";

export const menuItemLinks: MenuItemLink[] = [
	{
		title: "Saved Passwords",
		url: "/saved",
		icon: Save,
	},
];
