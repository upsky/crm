Node = function (data) {
    this._data = data;
};

_.extend(Node.prototype, TagsProto);
_.extend(Node.prototype, {
    _updateData: function (newData) {
        this._data = newData;

        // update threads
        var self = this;
        this._threads = _.map(newData.threads, function (threadData) {
            // TODO remove, it was actual when threads have no ids
            if ( !threadData._id )
                threadData._id = new Mongo.ObjectID();

            var thread = _.find(self._threads, function (thread) {
                var found = thread._data._id === threadData._id;
                console.log('thread found ' + threadData._id);
                return found;
            });

            if (thread) {
                thread._updateData(threadData);
            } else {
                thread = new Thread(self, threadData);
            }
            return thread;
        });
    },

    id: function () {
        return this._data._id;
    },

    children: function () {
        if (this.hasChildNodes()) {
            return DataTreeCollection.find({
                _id: { $in: this._data.children }
            }).fetch();
        } else {
            return [];
        }
    },

    hasChildNodes: function () {
        return !_.isEmpty(this._data.children);
    },

    createChild: function () {
        var childId = DataTreeCollection.insert({});
        this.addChildId(childId);

        return DataTree.find(childId);
    },

    addChild: function (child) {
        check(child, Node);

        this.addChildId(child.id());
    },

    addChildId: function (childId) {
        check(childId, String);

        DataTreeCollection.update(
            { _id: this.id() },
            { $push: { children: childId } }
        );
    },

    removeChild: function (child) {
        check(child, Node);

        DataTreeCollection.update(
            { _id: this.id() },
            { $pull: { children: child.id() } }
        )
    },

    threads: function () {
        var self = this;

        if (! this._threads) {
            this._threads = _.map(this._data.threads, function (data) {
                return new Thread(self, data);
            });
        }

        return this._threads;
    },

    createThread: function (type) {
        check(type, String);

        var thread = new Thread(this, { _type: type });

        if (!this._data.hasOwnProperty('threads'))
            this._data.threads = [];
        this._data.threads.push(thread.data());

        if (!this.hasOwnProperty('_threads'))
            this._threads = [];
        this._threads.push(thread);

        return thread;
    },

    removeThread: function (thread) {
        check(thread, Thread);

        this._data.threads = _.without(this._data.threads, thread.data());
    },


    save: function () {
        DataTreeCollection.update(
            { _id: this.id() },
            this._data
        );
    },

    equals: function (other) {
        return other instanceof Node && other.id().equals(this.id());
    }
});
