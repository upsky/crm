// Avatar object to be exported
Avatar = {

  // If defined (e.g. from a startup config file in your app), these options
  // override default functionality
  options: {

    // This property on the user object will be used for retrieving gravatars
    // (useful when user emails are not published).
    emailHashProperty: '',

    // What to show when no avatar can be found via linked services:
    // 'initials' (default) or 'image'
    defaultType: '',

    // This will replace the included default avatar image's URL
    // ('packages/bengott_avatar/default.png'). It can be a relative path
    // (relative to website's base URL, e.g. 'images/defaultAvatar.png').
    defaultImageUrl: '',

    // Gravatar default option to use (overrides default image URL)
    // Options are available at:
    // https://secure.gravatar.com/site/implement/images/#default-image
    gravatarDefault: ''
  },

  // Get the initials of the user
  getInitials: function (user) {

    var initials = '';
    var parts = [];

    if (user && user.profile && user.profile.firstName) {
      initials = user.profile.firstName.charAt(0).toUpperCase();

      if (user.profile.lastName) {
        initials += user.profile.lastName.charAt(0).toUpperCase();
      }
      else if (user.profile.familyName) {
        initials += user.profile.familyName.charAt(0).toUpperCase();
      }
      else if (user.profile.secondName) {
        initials += user.profile.secondName.charAt(0).toUpperCase();
      }
    }
    else if (user && user.profile && user.profile.name) {
      parts = user.profile.name.split(' ');
      // Limit getInitials to first and last initial to avoid problems with
      // very long multi-part names (e.g. "Jose Manuel Garcia Galvez")
      initials = _.first(parts).charAt(0).toUpperCase();
      if (parts.length > 1) {
        initials += _.last(parts).charAt(0).toUpperCase();
      }
    }

    return initials;
  },

  // Get the url of the user's avatar
  getUrl: function (user, email) {

    var defaultUrl = Avatar.options.defaultImageUrl || 'packages/bengott_avatar/default.png';
    // If it's a relative path (no '//' anywhere), complete the URL
    if (defaultUrl.indexOf('//') === -1) {
      // Strip starting slash if it exists
      if (defaultUrl.charAt(0) === '/') defaultUrl = defaultUrl.slice(1);
      // Then add the relative path to the server's base URL
      defaultUrl = Meteor.absoluteUrl() + defaultUrl;
    }

    var url = '';
    var svc = getService(user);
    if (svc === 'twitter') {
      // use larger image (200x200 is smallest custom option)
      url = user.services.twitter.profile_image_url.replace('_normal.', '_200x200.');
    }
    else if (svc === 'facebook') {
      // use larger image (~200x200)
      url = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?type=large';
    }
    else if (svc === 'google') {
      url = user.services.google.picture;
    }
    else if (svc === 'github') {
      url = 'http://avatars.githubusercontent.com/' + user.services.github.username + '?s=200';
    }
    else if (svc === 'instagram') {
      url = user.services.instagram.profile_picture;
    }
    else if (svc === 'none') {
      url = getGravatarUrl(user, defaultUrl, email);
    }
    return url;
  }
};
