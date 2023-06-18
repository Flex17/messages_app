import {useEffect, useState} from "react";

export const useFavourite = () => {
    const [favourites, setFavourites] = useState<string[]>([]);

    // * До такого как обновить страницу, заполняем localStorage
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("favourites", JSON.stringify(favourites));
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [favourites]);

    // * При загрузке страницы беремс данные из localStorage
    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites");
        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
        }
    }, []);

    // * Добавляем/удаляем id поста из localStorage
    const handleToggleFavorite = (id: string) => {
        const updatedFavorites = favourites.includes(id)
            ? favourites.filter((favouriteId) => favouriteId !== id)
            : [...favourites, id];
        setFavourites(updatedFavorites);
    };

    // * Проверяет принадллежит ли пост списку любимых или нет
    const isFavourite = (id: string) => {
        return favourites.includes(id);
    }

    return {
        handleToggleFavorite,
        isFavourite,
    }
}
