const COUNTRY_CODE = '375';

export const PHONE_MASK_PREFIX = '+375(';

export const formatPhoneNumber = (
  value: string,
  allowIncomplete = false
): string => {
  let cleanValue = value.replace(/\D/g, '');

  if (!cleanValue.startsWith(COUNTRY_CODE)) {
    cleanValue = COUNTRY_CODE + cleanValue;
  }
  cleanValue = cleanValue.substring(0, 12);

  let formattedValue = PHONE_MASK_PREFIX;
  const currentDigits = cleanValue.substring(3);

  if (currentDigits.length > 0) {
    formattedValue += currentDigits.substring(0, 2);
    if (currentDigits.length > 2) {
      formattedValue += ')-';
      formattedValue += currentDigits.substring(2, 5);
      if (currentDigits.length > 5) {
        formattedValue += '-';
        formattedValue += currentDigits.substring(5, 7);
        if (currentDigits.length > 7) {
          formattedValue += '-';
          formattedValue += currentDigits.substring(7, 9);
        }
      }
    }
  }

  if (!allowIncomplete && cleanValue.length < 12) {
    return cleanValue;
  }

  return formattedValue;
};
