import { useTheme } from "@/providers/theme-provider";
import { Toaster } from "sonner";
const AppToaster = () => {
	const { theme } = useTheme();
	return <Toaster theme={theme} />;
};
export default AppToaster;
