import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import AuthPage from '../views/AuthPage.vue';
import NotificationsPage from '../views/NotificationsPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import TabsPage from '../views/TabsPage.vue';
import ChatTab from '../views/tabs/ChatTab.vue';
import MainTab from '../views/tabs/MainTab.vue';
import ProfileTab from '../views/tabs/ProfileTab.vue';
import StatsTab from '../views/tabs/StatsTab.vue';
import TradesTab from '../views/tabs/TradesTab.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/main',
      },
      {
        path: 'main',
        name: 'MainTab',
        component: MainTab,
      },
      {
        path: 'stats',
        name: 'StatsTab',
        component: StatsTab,
      },
      {
        path: 'trades',
        name: 'TradesTab',
        component: TradesTab,
      },
      {
        path: 'chat',
        name: 'ChatTab',
        component: ChatTab,
      },
      {
        path: 'profile',
        name: 'ProfileTab',
        component: ProfileTab,
      },
    ],
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: NotificationsPage,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
