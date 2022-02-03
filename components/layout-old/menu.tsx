import { MenuItemType } from '@paljs/ui';

export const menu: MenuItemType[] = [
  {
    title: 'Overview',
    group: true,
  },
  {
    title: 'Brewing',
    icon: { name: 'home' },
    link: { href: '/brewing' },
  },
  {
    title: 'Fermenting',
    icon: { name: 'home' },
    link: { href: '/fermenting' },
  },
  {
    title: 'Equipment',
    group: true,
  },
  {
    title: 'Sensors',
    icon: { name: 'thermometer-outline' },
    link: { href: '/equipment/sensors' },
  },
  {
    title: 'Heaters',
    icon: { name: 'home' },
    link: { href: '/equipment/heaters' },
  },
  // { title: 'Settings', group: true },
  // {
  //   title: 'Plugins',
  //   icon: { name: 'code-download-outline' },
  //   link: { href: '/settings/plugins' },
  // },
];
