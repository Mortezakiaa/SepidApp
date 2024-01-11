export interface LoginDto {
  phone_number: string;
}

export interface TokenInfoType {
  context: {
    id: number;
  };
  exp: number;
  iat: number;
}
