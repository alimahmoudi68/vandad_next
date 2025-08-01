export const convertPersianToEnglishNumbers = (input: string): string => {
    const persianNumbers: { [key: string]: string } = {
        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', 
        '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
    };

    return input.replace(/[۰-۹]/g, (char) => persianNumbers[char] || char);
}