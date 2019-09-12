const trans = (translation, context) => {
  let result = translation;
  if (typeof context === 'object') {
    const matches = result.match(/(%([^%]|%%)*%)/g);

    if (matches) {
      matches.forEach((match) => {
        const prop = match.replace(/[%]+/g, '');
        if (!Object.prototype.hasOwnProperty.call(context, prop)) {
          return;
        }

        const regex = new RegExp(match, 'g');
        result = result.replace(regex, context[prop]);
      });
    }
  }

  return result;
};

// match groups for `rangePattern`
// match 0: the entire translation string
// match 1: open or closed range ] or [ i.e. exlusive or inclusive start
// match 2: value of range start
// match 3: value of range end
// match 4: open or closed range ] or [ i.e. inclusive or exlusive end
// match 5: the contents of the template (i.e. exclude type preamble)
const rangePattern = /(\[|\])(\d+|Inf), ?(\d+|Inf)(\[|\])(.+)/;
const exactPattern = /\{(\d+)\}(.*)/;

// a typical multiple choice pattern looks like:
// '{0} no apples|{1} one apple|]1, Inf] A lot of apples'
const transchoice = (translation, context) => {
  let result = translation;
  // split choice template on delimiter `|`
  const templates = result.split('|');
  templates.forEach((t) => {
    const choice = parseInt(context.count, 10);
    // for each choice pattern, determine the type: exact or range
    const exactMatch = t.match(exactPattern);
    if (exactMatch) {
      // we found the correct exact match
      if (parseInt(exactMatch[1], 10) === choice) {
        // eslint-disable-next-line prefer-destructuring
        result = exactMatch[2];
      }
    } else {
      const rangeMatch = t.match(rangePattern);
      // there was no pattern
      if (!rangeMatch) { return; }
      let start = rangeMatch[2];
      let end = rangeMatch[3];
      if (start !== 'Inf') start = parseInt(start, 10);
      if (end !== 'Inf') end = parseInt(end, 10);

      // starting range excludes the start value
      if (rangeMatch[1] === ']' && typeof start === 'number') {
        start += 1;
      }
      // ending range excludes the end value
      if (rangeMatch[4] === '[' && typeof end === 'number') {
        end -= 1;
      }
      // the passed in value was within the range
      if (choice >= start && (choice <= end || end === 'Inf')) {
        // eslint-disable-next-line prefer-destructuring
        result = rangeMatch[5];
      }
    }
  });
  return trans(result, context);
};

export default (key, context) => {
  let translation = key;

  if (window.translations !== undefined && window.translations[key] !== undefined) {
    translation = window.translations[key];
  }

  if (context && typeof context === 'object' && Object.prototype.hasOwnProperty.call(context, 'count')) {
    return transchoice(translation, context);
  }
  return trans(translation, context);
};
