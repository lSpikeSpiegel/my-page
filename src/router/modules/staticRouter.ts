import { RouteRecordRaw } from "vue-router";

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	redirect: { name: "404" }
};
