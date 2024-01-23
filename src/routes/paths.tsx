// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

function dashboardPath(link: string) {
  return `${ROOTS_DASHBOARD}${link}`;
}

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  pharmacy: {
    root: dashboardPath('/pharmacy'),
    list: dashboardPath('/pharmacy/list'),
    new: dashboardPath('/pharmacy/new'),
    edit: (id) => dashboardPath(`/pharmacy/edit/${id}`),
  },
  product: {
    root: dashboardPath('/product'),
    list: dashboardPath('/product/list'),
    new: dashboardPath('/product/new'),
    edit: (id) => dashboardPath(`/product/edit/${id}`),
  },
  general: {
    app: dashboardPath('/app'),
    ecommerce: dashboardPath('/ecommerce'),
    analytics: dashboardPath('/analytics'),
    banking: dashboardPath('/banking'),
    booking: dashboardPath('/booking'),
  },
  mail: {
    root: dashboardPath('/mail'),
    all: dashboardPath('/mail/all'),
  },
  chat: {
    root: dashboardPath('/chat'),
    new: dashboardPath('/chat/new'),
    view: (name) => dashboardPath(`/chat/${name}`),
  },
  calendar: dashboardPath('/calendar'),
  kanban: dashboardPath('/kanban'),
  user: {
    root: dashboardPath('/user'),
    new: dashboardPath('/user/new'),
    list: dashboardPath('/user/list'),
    cards: dashboardPath('/user/cards'),
    profile: dashboardPath('/user/profile'),
    account: dashboardPath('/user/account'),
    edit: (id) => dashboardPath(`/user/${id}/edit`),
    demoEdit: dashboardPath(`/user/reece-chung/edit`),
  },
  eCommerce: {
    root: dashboardPath('/e-commerce'),
    shop: dashboardPath('/e-commerce/shop'),
    list: dashboardPath('/e-commerce/list'),
    checkout: dashboardPath('/e-commerce/checkout'),
    new: dashboardPath('/e-commerce/product/new'),
    view: (name) => dashboardPath(`/e-commerce/product/${name}`),
    edit: (name) => dashboardPath(`/e-commerce/product/${name}/edit`),
    demoEdit: dashboardPath('/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: dashboardPath('/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: dashboardPath('/invoice'),
    list: dashboardPath('/invoice/list'),
    new: dashboardPath('/invoice/new'),
    view: (id) => dashboardPath(`/invoice/${id}`),
    edit: (id) => dashboardPath(`/invoice/${id}/edit`),
    demoEdit: dashboardPath('/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: dashboardPath('/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: dashboardPath('/blog'),
    posts: dashboardPath('/blog/posts'),
    new: dashboardPath('/blog/new'),
    view: (title) => dashboardPath(`/blog/post/${title}`),
    demoView: dashboardPath('/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
