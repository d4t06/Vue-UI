import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Popup from "../pages/popup/PopupPage.vue";
import ButtonPage from "../pages/button/index.vue";
import ToastPage from "../pages/toast/index.vue";
import Home from "../pages/Home.vue";
import Provider from "../pages/provider/Provider.vue";
import MusicPlayer from "../pages/music-player/Wrapper.vue";
import TooltipPage from "../pages/tooltip/TooltipPage.vue";
import SearchBarPage from "../pages/search-bar/index.vue";
import ModalPage from "../pages/modal/index.vue";

export const routeList = [
  {
    title: "Home",
    path: "/",
    component: Home,
  },
    {
    title: "Button",
    path: "/button",
    component: ButtonPage,
  },
      {
    title: "Toast",
    path: "/toast",
    component: ToastPage,
  },

  {
    title: "Provider",
    path: "/provider",
    component: Provider,
  },
  {
    title: "Popup",
    path: "/popup",
    component: Popup,
  },
  {
    title: "Tooltip",
    path: "/tooltip",
    component: TooltipPage,
  },
  {
    title: "Music Player",
    path: "/music-player",
    component: MusicPlayer,
  },
  {
    title: "Search Bar",
    path: "/search-bar",
    component: SearchBarPage,
  },
  {
    title: "Modal",
    path: "/modal",
    component: ModalPage,
  },
];

const routes: Array<RouteRecordRaw> = [];

routeList.map((r) => {
  const routeItem: RouteRecordRaw = {
    path: r.path,
    component: r.component,
  };

  routes.push(routeItem);
});

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
