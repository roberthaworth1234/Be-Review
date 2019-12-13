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
  if (!comments.length) return [];
  else {
    return comments.map(obj => {
      const commentsCopy = { ...obj };
      commentsCopy.author = obj.created_by;
      commentsCopy.article_id = articleRef[obj.belongs_to];
      commentsCopy.created_at = new Date(obj.created_at);
      delete commentsCopy.belongs_to;
      delete commentsCopy.created_by;
      return commentsCopy;
    });
  }
};
