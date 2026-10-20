export const money = (n, cur = 'Rs') => `${cur} ${Math.round(Number(n) || 0).toLocaleString('en-US')}`;

export const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
