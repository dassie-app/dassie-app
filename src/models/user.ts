export interface User {
  name: string;
  email: string;
  password: string;
  wishlist?: number[];
  following?: number[];
  image?: string;
}
