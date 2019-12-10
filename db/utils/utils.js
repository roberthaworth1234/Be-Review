exports.formatDates = list => {
  const newArray = []
  list.forEach(obj => {
    let newObj = { ...obj };
    newObj.created_at = new Date(obj.created_at)
    newArray.push(newObj);
  })
  return newArray
};

exports.makeRefObj = (list, key, value) => {
  if (!list.length) return {};
  else {
    const refObj = {};
    list.forEach(obj => {
      refObj[obj[key]] = obj[value]
    })
    return refObj;
  }
};

exports.formatComments = (comments, articleRef) => {
  if (!comments.length) return [];
  else {
    const newArray = [];
    comments.forEach(obj => {
      const commentsCopy = { ...obj }
      commentsCopy.author = obj.created_by;
      commentsCopy.article_id = articleRef[obj.belongs_to]
      commentsCopy.created_at = new Date(obj.created_at)
      delete commentsCopy.belongs_to;
      delete commentsCopy.created_by;
      newArray.push(commentsCopy)
    })
    return (newArray)
  }
};
