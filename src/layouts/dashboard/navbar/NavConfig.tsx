// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { getTokenInfo, getUserInfo } from '@utils/jwt.ts';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  pharmacy: getIcon('ic_pharmacy'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'کلی',
    items: [
      { title: 'داشبورد', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // // MANAGEMENT
  // // ----------------------------------------------------------------------
  {
    subheader: 'مدیریت',
    items: [
      // USER
      {
        title: 'کاربران',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          // { title: 'پروفایل', path: PATH_DASHBOARD.user.profile },
          // { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'لیست کاربران', path: PATH_DASHBOARD.user.list },
          { title: 'ساخت کاربر', path: PATH_DASHBOARD.user.new },
          { title: 'ویرایش کاربر', path: PATH_DASHBOARD.user.edit(getTokenInfo()?.id) },
          // { title: 'حساب کاربری', path: PATH_DASHBOARD.user.account },
        ],
      },
      {
        title: 'داروخانه ها',
        path: PATH_DASHBOARD.pharmacy.root,
        icon: ICONS.pharmacy,
        children: [
          { title: 'لیست داروخانه ها', path: PATH_DASHBOARD.pharmacy.list },
          { title: 'ساخت داروخانه ها', path: PATH_DASHBOARD.pharmacy.new },
          // {
          //   title: 'ویرایش داروخانه ها',
          //   path: getUserInfo()?.pharmacy_id
          //     ? PATH_DASHBOARD.pharmacy.edit(getUserInfo().pharmacy_id)
          //     : PATH_DASHBOARD.pharmacy.list,
          // },
        ],
      },

      // E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      // INVOICE
      // {
      //   title: 'فاکتور ها',
      //   path: PATH_DASHBOARD.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'لیست', path: PATH_DASHBOARD.invoice.list },
      //     { title: 'اطلاعات', path: PATH_DASHBOARD.invoice.demoView },
      //     { title: 'ساخت', path: PATH_DASHBOARD.invoice.new },
      //     { title: 'ویرایش', path: PATH_DASHBOARD.invoice.demoEdit },
      //   ],
      // },
      //
      // // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
    ],
  },
  //
  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'پشتیبانی',
    items: [
      // {
      //   title: 'mail',
      //   path: PATH_DASHBOARD.mail.root,
      //   icon: ICONS.mail,
      //   info: (
      //     <Label variant="outlined" color="error">
      //       +32
      //     </Label>
      //   ),
      // },
      { title: 'تیکت', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      // { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      // { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
    ],
  },
];

export default navConfig;
