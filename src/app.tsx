import { useRoutes } from "react-router-dom";
import Layout from "./app/layout";
import router from "./router/router";

const App = () => {
	const routes = useRoutes(router);
	return <Layout>{routes}</Layout>;
};
export default App;
