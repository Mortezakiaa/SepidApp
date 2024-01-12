import { RoleEnum } from '@/types/enums/role.enum.ts';

export const translateRole = {
  [RoleEnum.ADMIN]: 'مدیر',
  [RoleEnum.SUPPORT]: 'پشتیبان',
  [RoleEnum.PHARMACY]: 'داروخانه',
  [RoleEnum.USER]: 'کاربر',
};
