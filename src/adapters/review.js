const createReview = (comment) => {
  return {
    id: comment[`id`],
    text: comment[`comment`],
    rating: comment[`rating`],
    author: comment[`user`][`name`],
    date: new Date(comment[`date`]),
  };
};

const createReviews = (comments) => {
  return comments.map((comment) => createReview(comment));
};


export {
  createReview,
  createReviews,
};
