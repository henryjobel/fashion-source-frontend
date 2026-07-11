import type { ApiCategory } from "./api";

/** Returns the selected category slug and every active descendant category slug. */
export function getCategoryTreeSlugs(categories: ApiCategory[], selectedSlug: string) {
  const selected = categories.find(
    (category) => category.slug === selectedSlug && category.status === "active",
  );
  if (!selected) return new Set([selectedSlug]);

  const slugs = new Set([selected.slug]);
  const pendingParentIds = [selected.id];

  while (pendingParentIds.length > 0) {
    const parentId = pendingParentIds.shift();
    for (const category of categories) {
      if (
        category.status === "active" &&
        category.parent === parentId &&
        !slugs.has(category.slug)
      ) {
        slugs.add(category.slug);
        pendingParentIds.push(category.id);
      }
    }
  }

  return slugs;
}
