import { RoleEnum } from '@/types/enums/role.enum.ts';

export const translateRole = {
  [RoleEnum.ADMIN]: 'مدیر',
  [RoleEnum.PHARMACY]: 'مدیر داروخانه',
  [RoleEnum.SUPPORT]: 'پشتیبان',
  [RoleEnum.USER]: 'کاربر',
  ['all']: 'همه',
};
