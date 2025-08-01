function generateVariant<T extends Record<string, any[]>>(obj: T): Array<{ [K in keyof T]: T[K][number] }> {
  const keys = Object.keys(obj) as (keyof T)[];

  // اگر ورودی خالی باشه → خروجی []
  if (keys.length === 0) {
    return [];
  }

  // اگر یک کلید مقدار خالی داشت → خروجی []
  if (keys.some(key => obj[key].length === 0)) {
    return [];
  }

  return keys.reduce(
    (acc, key) => {
      const values = obj[key];
      const result: Array<{ [K in keyof T]: T[K][number] }> = [];

      acc.forEach(item => {
        values.forEach(value => {
          result.push({
            ...item,
            [key]: value
          });
        });
      });

      return result;
    },
    [{} as { [K in keyof T]: T[K][number] }]
  );
}

export default generateVariant;
