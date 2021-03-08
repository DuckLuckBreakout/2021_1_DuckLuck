/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class AjaxModule {

    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static getUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'GET', ...ajaxArgs});
    }

    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static postUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'POST', ...ajaxArgs});
    }

    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static deleteUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'DELETE', ...ajaxArgs});
    }

    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static putUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'PUT', ...ajaxArgs});
    }

    static #usingFetch = (ajaxArgs) => {
        // TODO: make beauty
        if (!ajaxArgs.data && ajaxArgs.body) {
            ajaxArgs.body = JSON.stringify(ajaxArgs.body)
        }
        return fetch (ajaxArgs.url, {
            method: ajaxArgs.method,
            body: (ajaxArgs.body) ? ajaxArgs.body : null,
            credentials: 'include',
            mode: 'cors',
            // TODO: Uncomment and make multipart/data and boundary (doesnt work right now)
            // headers: {
            //     'Content-Type': 'application/json;charset=utf-8',
            // }
        });
    }
}
