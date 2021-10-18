import {groupPriceSizes, priceSizeToMap} from './utils';

describe('order book utils', () => {
  describe('groupPriceSizes', () => {
    const MOCKED_PRICE_SIZES = {
      '48977': 5154,
      '48980': 1000,
      '48994': 193149,
      '48996': 5625,
      '48996.5': 10000,
      '48997': 16320,
      '48997.5': 5296,
      '48999.5': 1000,
      '49005': 10000,
      '49005.5': 136148,
      '49011': 9920,
      '49011.5': 68938,
      '49018.5': 4698,
      '49020.5': 2500,
      '49021': 25000,
      '49025': 20000,
      '49026.5': 9807,
      '49027': 54335,
      '49032.5': 5000,
      '49034.5': 70035,
      '49035': 65000,
      '49036': 12114,
      '49038.5': 3070,
      '49039.5': 2796,
      '49042': 7500,
    };

    it('group price size in ascending order', () => {
      const groupedPriceSizes = groupPriceSizes(MOCKED_PRICE_SIZES, 2, 'asc');

      expect(groupedPriceSizes).toEqual([
        {price: 48977, size: 5154, total: 5154},
        {price: 48980, size: 1000, total: 6154},
        {price: 48994, size: 193149, total: 199303},
        {price: 48996, size: 37241, total: 236544},
        {price: 48999.5, size: 1000, total: 237544},
        {price: 49005, size: 146148, total: 383692},
        {price: 49011, size: 78858, total: 462550},
        {price: 49018.5, size: 4698, total: 467248},
        {price: 49020.5, size: 27500, total: 494748},
        {price: 49025, size: 29807, total: 524555},
        {price: 49027, size: 54335, total: 578890},
        {price: 49032.5, size: 5000, total: 583890},
        {price: 49034.5, size: 147149, total: 731039},
        {price: 49038.5, size: 5866, total: 736905},
        {price: 49042, size: 7500, total: 744405},
      ]);
    });

    it('group price size in descending order', () => {
      const groupedPriceSizes = groupPriceSizes(MOCKED_PRICE_SIZES, 2, 'desc');

      expect(groupedPriceSizes).toEqual([
        {price: 49042, size: 7500, total: 7500},
        {price: 49039.5, size: 5866, total: 13366},
        {price: 49036, size: 147149, total: 160515},
        {price: 49032.5, size: 5000, total: 165515},
        {price: 49027, size: 64142, total: 229657},
        {price: 49025, size: 20000, total: 249657},
        {price: 49021, size: 27500, total: 277157},
        {price: 49018.5, size: 4698, total: 281855},
        {price: 49011.5, size: 78858, total: 360713},
        {price: 49005.5, size: 146148, total: 506861},
        {price: 48999.5, size: 1000, total: 507861},
        {price: 48997.5, size: 37241, total: 545102},
        {price: 48994, size: 193149, total: 738251},
        {price: 48980, size: 1000, total: 739251},
        {price: 48977, size: 5154, total: 744405},
      ]);
    });
  });

  describe('priceSizeToMap', () => {
    it('convert tuple to map', () => {
      const priceSizeMap = priceSizeToMap([
        [3213, 3],
        [4326, 35],
        [4322, 43],
      ]);

      expect(priceSizeMap).toEqual({'3213': 3, '4322': 43, '4326': 35});
    });
  });
});
