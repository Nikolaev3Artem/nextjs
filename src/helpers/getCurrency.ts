export const currency = [
  {
    id: 1,
    title: 'UAH',
    icon: 'TbCurrencyHryvnia',
    rate: 40,
  },
  { id: 2, title: 'USD', icon: 'AttachMoneyIcon', rate: 0.98 },
  { id: 3, title: 'EUR', icon: 'EuroIcon', rate: 1 },
];

export const getCurrency = (currencyId: number) => {
  const selected = currency.filter(el => el.id === currencyId);

  return selected[0].title;
};
