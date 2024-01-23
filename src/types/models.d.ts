interface LoginDto {
  phone_number: string;
  code?: string;
}

interface PharmacyInfo {
  phone_number: string;
  address: string;
}

interface SoftwareInfo {
  previous_version: string;
  system_count: number;
  printer_count: number;
}
interface BaseEntity {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

interface Pharmacy extends BaseEntity {
  name: string;

  info: PharmacyInfo;

  software_info: SoftwareInfo;

  city_id: number;

  is_active: boolean;

  end_date: Date;

  members: User[];

  orders: Order[];

  city: City;
}

interface City {
  id: number;

  name: string;

  slug: string;

  province_id: number;

  province: Province;

  pharmacies: Pharmacy[];
}
interface Province {
  id: number;

  name: string;

  slug: string;

  cities: City[];
}
interface TokenInfoType {
  context: {
    id: number;
    role: RoleEnum;
    permissions: PermissionEnum;
  };
  exp: number;
  iat: number;
}
interface LoginRes {
  access_token: string;
  user: User;
}

enum RoleEnum {
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  PHARMACY = 'PHARMACY',
  USER = 'USER',
}

enum PermissionEnum {
  TicketResponse = 'ticket_response',
  AddTimeToPharmacy = 'add_time_to_pharmacy',
  AddPharmacy = 'add_pharmacy',
  EditPharmacy = 'edit_pharmacy',
  AddProduct = 'add_product',
  EditProduct = 'edit_product',
  AddPost = 'add_post',
  EditPost = 'edit_post',
}

interface User {
  id: number;

  profile;

  full_name?: string;

  phone_number: string;

  role: RoleEnum;

  pharmacy_id: number;

  status: UserStatusEnum;

  pharmacy: Pharmacy;

  permissions: PermissionEnum[];

  // pharmacy: Pharmacy;
}
enum FactorTypeEnum {
  BUY = 'BUY',
  RENEW = 'RENEW',
  UPGRADE = 'UPGRADE',
}
enum FactorStatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
}

interface Order extends BaseEntity {
  pharmacy_id: number;

  factors: Factor[];

  status: FactorStatusEnum;

  pharmacy: Pharmacy;
}

interface Support extends BaseEntity {
  title: string;

  duration: number;

  price: number;

  final_price: number;

  offer_price: number;

  orders: Order[];

  uploads: Upload[];
}

interface Product extends BaseEntity {
  title: string;

  info: string;

  type: ProductTypeEnum;

  price: number;

  offer_price: number;

  orders: Order[];

  uploads: Upload[];
}

interface Factor extends BaseEntity {
  order_id: number;
  price: number;
  final_price: number;
  offer_price: number;
  type: FactorTypeEnum;
  creator_id: number;
  payer_id?: number;
  product_id?: number;
  support_id?: number;
  status: FactorStatusEnum;
  order: Order;
  creator: User;
  transactions: Transaction[];
  product: Product;
  support: Support;
}

interface Transaction extends BaseEntity {
  card_no: string;

  factor_id: number;

  hash_id: string;

  price: number;

  factor: Factor;
}
