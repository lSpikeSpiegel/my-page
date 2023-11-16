import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "@/config/nprogress";
import { staticRouter } from "./modules/staticRouter";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done();
});

export default router;
