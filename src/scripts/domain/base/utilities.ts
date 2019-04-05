export const sortById = (p1, p2) => p2.id! - p1.id!;

export const sortByCreatedDate = (p1, p2) => {
    const p1Date = new Date(p1.createdAt);
    const p2Date = new Date(p2.createdAt);

    return p2Date.getTime() - p1Date.getTime();
};