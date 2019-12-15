exports.formatDates = list => {
  return list.map(obj => {
    let newObj = { ...obj };
    newObj.created_at = new Date(obj.created_at);
    return newObj;
  });
};

exports.makeRefObj = (list, key, value) => {
  if (!list.length) return {};
  else {
    const refObj = {};
    list.forEach(obj => {
      refObj[obj[key]] = obj[value];
    });
    return refObj;
  }
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(
    ({
      ["belongs_to"]: key,
      ["created_at"]: key2,
      ["created_by"]: key3,
      ...otherKeys
    }) => {
      return {
        ["author"]: key3,
        ["article_id"]: articleRef[key],
        ["created_at"]: new Date(key2),
        ...otherKeys
      };
    }
  );
};
