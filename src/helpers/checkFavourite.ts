export const checkFavourite = (id: string) => {
    return !!localStorage.getItem(id);

}

export const handleFavourite = (id: string, isFavourite: boolean) => {
    if (isFavourite) {
        localStorage.setItem(id, "true");
    } else {
        localStorage.removeItem(id);
    }
}
