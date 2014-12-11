// Write your package code here!

registeredTypes = [];
registeredStatics = [];

function checkArray(arr, key) {
    if (!_.isArray(arr[key]))
        arr[key] = [];
}

//plugin namespace
Plugin = {
    addType: function (type, callbacks, context) {
        context = context || 'default';

        checkArray(registeredTypes, context);

        registeredTypes[context][type] = callbacks;
    },

    addStatic: function (callbacks, context) {
        checkArray(registeredStatics, context);

        registeredStatics[context].push(callbacks);
    },

    _threadCallbacks: function (type, context) {
        context = context || 'default';

        return registeredTypes[context][type];
    },

    _staticCallbacks: function (context) {
        context = context || 'default';

        return registeredStatics[context] || [];
    }
};