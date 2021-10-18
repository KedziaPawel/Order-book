import {PriceSizeItemWithTotal, PriceSize, PriceSizesMap} from '@app/types';

export const groupPriceSizes = (
  priceSizesMap: PriceSizesMap,
  ticketSize: number,
  order: 'asc' | 'desc',
) =>
  Object.entries(priceSizesMap)
    .sort(([aPrice], [bPrice]) => {
      if (order === 'asc') {
        return Number(aPrice) - Number(bPrice);
      }
      return Number(bPrice) - Number(aPrice);
    })
    .reduce<PriceSizeItemWithTotal[]>((groupedPriceSizes, [price, size]) => {
      if (size === 0) {
        return groupedPriceSizes;
      }

      const priceNumber = Number(price);

      if (groupedPriceSizes.length === 0) {
        return [{price: priceNumber, size, total: size}];
      }

      const {
        price: previousPrice,
        size: previousSize,
        total: previusTotal,
      } = groupedPriceSizes[groupedPriceSizes.length - 1];

      const ascCondition = previousPrice + ticketSize > priceNumber;

      const descCondition = previousPrice - ticketSize < priceNumber;

      if (order === 'asc' ? ascCondition : descCondition) {
        const newSize = previousSize + size;
        const newTotal = previusTotal + size;
        return [
          ...groupedPriceSizes.slice(0, -1),
          {
            price: previousPrice,
            size: newSize,
            total: newTotal,
          },
        ];
      }

      return [
        ...groupedPriceSizes,
        {
          price: priceNumber,
          size,
          total: previusTotal + size,
        },
      ];
    }, []);

export const priceSizeToMap = (priceSizes: PriceSize[]) => {
  const priceSizeMap: PriceSizesMap = {};

  priceSizes.forEach(([price, size]: PriceSize) => {
    priceSizeMap[price] = size;
  });

  return priceSizeMap;
};
