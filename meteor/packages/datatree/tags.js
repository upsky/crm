Tags = [];

// Tag klass
Tag = function (data) {
    check(data, {
        _id: String,
        name: String
    });

    this._data = data;
};

_.extend(Tag.prototype, {
    id: function () {
        return this._data._id;
    },

    name: function () {
        return this._data.name;
    },

    threads: function () {

    },

    save: function () {
        DataTreeTagsCollection.update(
            { _id: this._data._id },
            this._data
        );
    }
});

var getTag = function (tagId) {
    var tag = Tags[tagId];
    if (typeof tag === 'undefined')
        throw ('tag with id ' + tagId + ' not found');

    return tag;
};

// tags protocol for Node and Thread extending
TagsProto = {
    tags: function () {
        var tagIds = this._data.tags;

        var tags = _.map(tagIds, function (tagId) {
            return getTag(tagId);
        });

        return tags;
    },

    addTag: function (tag) {
        check(tag, Tag);

        if (!this._data.hasOwnProperty('tags'))
            this._data.tags = [];

        this._data.tags.push(tag._data._id);
        this._data.tags = _.uniq(this._data.tags);
    },

    removeTag: function (tag) {
        check(tag, Tag);

        this._data.tags = _.without(this._data.tags, tag._data._id);
    }
};