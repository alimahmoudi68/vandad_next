

import { IFormItems } from "@/types/form";

const attributeVariantCombine = (
  oldItems: IFormItems[] = [],
  newItems: IFormItems[] = []
): IFormItems[] => {
  if (!Array.isArray(newItems)) return [];
  if (!Array.isArray(oldItems) || oldItems.length === 0) return [...newItems];

  const oldByLabel = new Map<string, IFormItems>();
  for (const item of oldItems) {
    const label = item?.config?.label;
    if (typeof label === "string" && label.length > 0) {
      oldByLabel.set(label, item);
    }
  }

  return newItems.map((item) => {
    const label = item?.config?.label;
    if (typeof label === "string" && oldByLabel.has(label)) {
      const oldItem = oldByLabel.get(label)!;
      return {
        ...item,
        value: oldItem.value,
        value2: oldItem.value2 ?? item.value2,
      };
    }
    return item;
  });
};

export default attributeVariantCombine;