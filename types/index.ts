export type PriceHistoryItem={
  price:number;
};
export type User={
  email:string;
};
export type Product={
  _id?:string;
  url:string;
  currency:string;
  image:string;
  title:string;
  currentPrice:number;
  originalPrice:number;
  priceHistory:PriceHistoryItem[]|[];
  highestPrice:number;
  lowestPrice:number;
  averagePrice:number;
  discountPrice:number;
  description:string;
  category:string;
  reviewsCount:number;
  stars:number;
  isOutofStock:Boolean;
  users?:User[];
};

export type EmailContent={
  subject:string;
  body:string;
};

export type EmailProductInfo={
  title:string;
  url:string;
};