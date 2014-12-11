/**
 * Created by kriz on 08.12.14.
 */

Thread = function (node, data) {
    check(node, Node);
    check(data, Match.ObjectIncluding({
        _type: String
    }));

    this._node = node;
    this._data = data;
    this._states = {
        edit: new ReactiveVar(false)
    };
};

_.extend(Thread.prototype, TagsProto);
_.extend(Thread.prototype, {
    type: function () {
        return this._data._type;
    },

    node: function () {
        return this._node;
    },

    data: function (data) {
        if (typeof data !== 'undefined')
            this._data = data;

        return this._data;
    },

    getEditState: function () {
        return this._states.edit.get();
    },
    setEditState: function (value) {
        this._states.edit.set(value);
    },

    equals: function (other) {
        return other instanceof Thread && this._data === other._data;
    }
});