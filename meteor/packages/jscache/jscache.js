/**
 * Created by kriz on 20.12.14.
 */

if (Meteor.isClient)
    JsCache = window.Cache;
else
    JsCache = global.Cache;