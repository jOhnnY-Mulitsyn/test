import { HTTP, HTTPS } from "@constants/api";

/**
 * Изменяет URL с HTTP на HTTPS
 * @param {String} url - url для изменения
 * @returns {String} - url c HTTPS
 */
export const changeHTTP = (url) => {
    const result = url ? url.replace(HTTP, HTTPS) : url;
    return result;
};

/**
 * Отправляет запрос Fetch
 * @param {String} url - url для запроса
 * @returns {Promise} - промис с результатом запроса
 */
export const getApiResource = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error("Could not fetch.", res.status);
            return false;
        }

        return await res.json();
    } catch (error) {
        console.error("Could not fetch.", error.message);
        return false;
    }
};

// (async () => {
//    const body = await getApiResource(SWAPI_ROOT + SWAPI_PEOPLE);
//    console.log(body);
// })();

// export const getApiResource = (url) => {
//    fetch(url)
//       .then((res) => {
//          if (!res.ok) {
//             console.error("Could not fetch.", res.status);
//             return false;
//          }
//          res.json();
//       })
//       .then((body) => {
//          return body;
//       })
//       .catch((error) => {
//          console.error("Could not fetch.", error.message);
//          return false;
//       });
// };

// getApiResource(SWAPI_ROOT + SWAPI_PEOPLE).then((body) => console.log(body));

export const makeConcurrentRequest = async (urlArray) => {
    const res = await Promise.all(
        urlArray.map((res) => {
            return fetch(res).then((res) => res.json());
        })
    );

    return res;
};
