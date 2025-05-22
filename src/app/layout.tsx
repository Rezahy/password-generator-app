import AppSidebar from "@/components/app-sidebar";
import AppToaster from "@/components/app-toaster";
import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import ScrollToTop from "@/components/scroll-to-top";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<ScrollToTop />
			<SidebarProvider>
				<AppSidebar />
				<main className="w-screen max-w-6xl mx-auto px-7 py-7 sm:px-10 pb-10">
					<SidebarTrigger />
					{children}
				</main>
			</SidebarProvider>
			<div className="absolute top-5 right-5">
				<ModeToggle />
			</div>
			<AppToaster />
			<Footer />
		</>
	);
}
