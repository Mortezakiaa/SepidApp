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
  };
  exp: number;
  iat: number;
}
interface LoginRes {
  access_token: string;
  user: User;
}
interface ResponseModel<T> {
  statusCode: number;
  data: T extends any[] ? BulkDataRes<T> : T;
  error: boolean;
  errorData: any;
}

interface BulkDataRes<T> {
  result: T;
  pagination: {
    currentPage?: number;
    nextPage?: number;
    prevPage?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    lastPage?: number;
    count?: number;
    take?: number;
  };
}

enum RoleEnum {
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  PHARMACY = 'PHARMACY',
  USER = 'USER',
}

enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
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

  permissions: PermissionEnum[];

  // pharmacy: Pharmacy;
}
