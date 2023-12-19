export function decodeHTMLEntities(str: string | undefined) {
  if (!str) {
    return '';
  }

  let result = str;
  //   result = result.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
  //   result = result.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
  result = result.replace(/&#039;/g, "'");
  result = result.replace(/&quot;/g, '"');
  return result;
}
