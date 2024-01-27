import { RoleEnum } from '@/enums/role.enum.ts';
import { UserStatusEnum } from '@/types/enums/user-status.enum.ts';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';
import { FactorStatusEnum } from '@/types/enums/factor-status.enum.ts';

export const ROLE_TRANSLATE = {
  [RoleEnum.ADMIN]: 'مدیر',
  [RoleEnum.SUPPORT]: 'پشتیبان',
  [RoleEnum.USER]: 'کاربر',
  [RoleEnum.PHARMACY]: 'مدیر داروخانه',
};

export const USER_STATUS_TRANSLATE = {
  [UserStatusEnum.ACTIVE]: 'فعال',
  [UserStatusEnum.INACTIVE]: 'غیر فعال',
};

export const FACTOR_TYPE_TRANSLATE = {
  All: 'همه',
  [FactorTypeEnum.BUY]: 'خرید',
  [FactorTypeEnum.RENEW]: 'تمدید',
  [FactorTypeEnum.UPGRADE]: 'ارتقا',
};

export const FACTOR_STATUS_TRANSLATE = {
  All: 'همه',
  [FactorStatusEnum.PAID]: 'پرداخت شده',
  [FactorStatusEnum.PENDING]: 'در انتظار پرداخت',
  [FactorStatusEnum.UNPAID]: 'پرداخت نشده',
};
