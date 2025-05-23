import { ShieldCheck } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { menuItemLinks } from "@/lib/menu-item-link";

const AppSidebar = () => {
	const { pathname } = useLocation();
	const { isMobile, setOpenMobile } = useSidebar();
	const sidebarMenuButtonClickHandler = () => {
		if (isMobile) {
			setOpenMobile(false);
		}
	};
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="mt-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Home"
							asChild
							size="lg"
							isActive={pathname === "/"}
							onClick={sidebarMenuButtonClickHandler}
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Link to="/">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#B8336A] text-sidebar-primary-foreground">
									<ShieldCheck className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										<span>Password Generator App</span>
										<span className="sr-only">Password Generator App</span>
									</span>
									<span className="truncate text-xs mt-1">
										Find the best one
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItemLinks.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title}
										asChild
										isActive={pathname === item.url}
										onClick={sidebarMenuButtonClickHandler}
									>
										<Link to={item.url}>
											<item.icon absoluteStrokeWidth />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};

export default AppSidebar;
