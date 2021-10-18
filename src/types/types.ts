export interface PI {
  symbol: string;
  ticketSizes: number[];
}

export interface PriceSizeItemWithTotal {
  price: number;
  size: number;
  total: number;
}
export type PriceSize = [number, number];

export interface PriceFeed {
  feed: string;
  bids: PriceSize[];
  asks: PriceSize[];
  product_id: string;
}

export type PriceSizesMap = {[price: number]: number};
