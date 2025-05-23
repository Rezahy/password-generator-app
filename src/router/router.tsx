import { Navigate, type RouteObject } from "react-router-dom";
import { lazy } from "react";
const HomePageLazy = lazy(() => import("@/app/page"));
const SavedPasswordsPageLazy = lazy(() => import("@/app/saved/page"));
const NotFoundLazy = lazy(() => import("@/app/not-found"));

const router: RouteObject[] = [
	{ path: "/", element: <HomePageLazy /> },
	{ path: "/saved", element: <SavedPasswordsPageLazy /> },
	{ path: "/notfound", element: <NotFoundLazy /> },
	{ path: "*", element: <Navigate to="/notfound" replace /> },
];

export default router;
