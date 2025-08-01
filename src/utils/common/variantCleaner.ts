type InputObject = Record<string, string>;

function variantCleaner(obj: InputObject): { text: string; cleaned: InputObject } {
  const resultText: string[] = [];
  const cleaned: InputObject = {};

  for (const key in obj) {
    if (obj[key].includes("/")) {
      const [beforeSlash, afterSlash] = obj[key].split("/");
      cleaned[key] = beforeSlash;
      resultText.push(afterSlash);
    } else {
      // اگر اسلش نداشت، همان مقدار اصلی را نگه می‌داریم
      cleaned[key] = obj[key];
    }
  }

  return {
    text: resultText.join(", "),
    cleaned,
  };
}


export default variantCleaner;