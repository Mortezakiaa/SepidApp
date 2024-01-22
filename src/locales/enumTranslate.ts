import { RoleEnum } from '@/enums/role.enum.ts';
import { UserStatusEnum } from '@/types/enums/user-status.enum.ts';

export const roleTranslate = {
  [RoleEnum.ADMIN]: 'مدیر',
  [RoleEnum.SUPPORT]: 'پشتیبان',
  [RoleEnum.USER]: 'کاربر',
  [RoleEnum.PHARMACY]: 'مدیر داروخانه',
};

export const userStatusTranslate = {
  [UserStatusEnum.ACTIVE]: 'فعال',
  [UserStatusEnum.INACTIVE]: 'غیر فعال',
};
