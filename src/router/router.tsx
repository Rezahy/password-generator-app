import SavedPasswordsPage from "@/app/saved/page";
import NotFound from "@/app/not-found";
import HomePage from "@/app/page";
import { Navigate, type RouteObject } from "react-router-dom";
const router: RouteObject[] = [
	{ path: "/", element: <HomePage /> },
	{ path: "/saved", element: <SavedPasswordsPage /> },
	{ path: "/notfound", element: <NotFound /> },
	{ path: "*", element: <Navigate to="/notfound" replace /> },
];

export default router;
