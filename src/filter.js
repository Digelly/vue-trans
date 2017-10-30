export default (key, context) => {
  let translation = key;

  if (window.translations !== undefined && window.translations[key] !== undefined) {
    translation = window.translations[key];
  }

  if (typeof context === 'object') {
    const matches = translation.match(/(%([^%]|%%)*%)/g);

    if (matches) {
      matches.forEach((match) => {
        const prop = match.replace(/[%]+/g, '');
        if (!Object.prototype.hasOwnProperty.call(context, prop)) {
          return;
        }

        const regex = new RegExp(match, 'g');
        translation = translation.replace(regex, context[prop]);
      });
    }
  }

  return translation;
};
