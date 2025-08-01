interface AttributesInput {
    attributes: Record<string, any[]>;
}
  
interface AttributesOutput {
attributes: Record<string, string>;
}

/**
 * از آبجکت ورودی یک آبجکت جدید می‌سازد که
 * تنها آن attributeهایی را نگه می‌دارد
 * که آرایه‌شان دقیقاً یک عضو دارد
 * و مقدار آن را به صورت رشته بازمی‌گرداند.
 *
 * @param input – آبجکت شامل فیلد attributes
 * @returns آبجکت جدید با attributes فیلترشده
 */
function filterSingleAttributes(input: AttributesInput): AttributesOutput {
    const output: AttributesOutput = { attributes: {} };

    for (const [key, values] of Object.entries(input.attributes)) {
        if (Array.isArray(values) && values.length === 1) {
        output.attributes[key] = String(values[0]);
        }
    }

    return output;
}

export default filterSingleAttributes;


