export interface ProductInterface {
  id: string;
  name: string | undefined;
  slug: string | undefined;
  brand: string | undefined;
  color: string | undefined;
  sellingPrice: number | undefined;
  retailPrice: number | undefined;
  discount: number | undefined;
  category: "MEN" | "WOMEN" | "KIDS";
  subCategory: string | undefined;
  productDetails: string | undefined;
  tags: string[];
  sizes: { size: string; stock: number }[];
  images: { url: string; public_id: string }[];
  searchTags: string;
}

export interface ProductDBInterface {
  id: string;
  name: string | undefined;
  slug: string | undefined;
  brand: string | undefined;
  color: string | undefined;
  sellingPrice: number | undefined;
  retailPrice: number | undefined;
  discount: number | undefined;
  category: "MEN" | "WOMEN" | "KIDS";
  subCategory: string | undefined;
  productDetails: string | undefined;
  tags: string[];
  sizes: { size: string; stock: number }[];
  images: { url: string; public_id: string }[];
  searchTags: string;
}

export interface ProductDetailsDBInterface {
  id: string;
  name: string | undefined;
  slug: string | undefined;
  brand: string | undefined;
  color: string | undefined;
  sellingPrice: number | undefined;
  retailPrice: number | undefined;
  discount: number | undefined;
  category: "MEN" | "WOMEN" | "KIDS";
  subCategory: string | undefined;
  productDetails: string | undefined;
  productCode: string | undefined;
  tags: string[];
  sizes: { size: string; stock: number }[];
  images: { url: string; public_id: string }[];
  searchTags: string;
  reviews: ReviewDBInterface[];
}

export interface WishlistInterface {
  name: string;
  slug: string;
  brand: string;
  color: string;
  sellingPrice: number;
  retailPrice: number;
  discount: number;
  image: string;
  productId: string;
  userId: string;
}

export interface WishlistDBInterface {
  id: string;
  name: string;
  slug: string;
  brand: string;
  color: string;
  sellingPrice: number;
  retailPrice: number;
  discount: number;
  image: string;
  productId: string;
  userId: string;
}

export interface BagInterface {
  name: string;
  slug: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  sellingPrice: number;
  retailPrice: number;
  discount: number;
  image: string;
  productId: string;
  userId: string;
}

export interface BagDBInterface {
  id: string;
  name: string;
  slug: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  sellingPrice: number;
  retailPrice: number;
  discount: number;
  image: string;
  productId: string;
  userId: string;
}

export interface OrderItemInterface {
  name: string;
  slug: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  retailPrice: number;
  image: string;
  productId: string;
}

export interface OrderDBInterface {
  id: string;
  transactionId: string;
  subTotal: number;
  totalAmount: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderItems: OrderItemInterface[];
  orderStatus: string;
  customerId: string;
  customerName: string;
  shipping: string;
  shippingCost: number;
  isPaid: boolean;
  paidAt: Date;
  confirmedAt: Date;
  shippedAt: Date;
  outForDeliveryAt: Date;
  deliveredAt: Date;
}

export interface ReviewInterface {
  userId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  productId: string;
}

export interface ReviewDBInterface {
  id: string;
  userId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  productId: string;
}

export interface HeroInterface {
  id: string;
  brand: string;
  image: string;
  headline: string;
  subHeadline: string;
  link: string;
  href: string;
}

export interface ShopByInterface {
  id: string;
  title: string;
  image: string;
  discount: string;
  type: string;
  href: string;
}
