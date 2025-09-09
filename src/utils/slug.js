// utils/slug.js
export const slugify = (title) =>
  title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : "default";

export const getCategoryPath = (category) => {
  const path = [];
  let current = category;
  while (current) {
    path.unshift(slugify(current.title));
    current = current.parent || null;
  }
  return path;
};
