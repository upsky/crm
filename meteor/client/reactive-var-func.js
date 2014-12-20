/**
 * Created by kriz on 18.12.14.
 */

ReactiveFuncVar = function (initialValue, comparator) {
    function rv () {
        return rv._var.get();
    }

    rv.get = function () {
        return this._var.get();
    };

    rv.set = function (value) {
        this._var.set(value);
    };
    rv._var = new ReactiveVar(initialValue, comparator);

    return rv;
};