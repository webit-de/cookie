define(function() {

  'use strict';

  /************************************************************
   @description create, read, erase Cookies
   @see http://www.quirksmode.org/js/cookies.html
   *************************************************************/
  var Cookie = {
    create: function(name, value, days, sameSite, domain) {
      var expires = "";
      var cookie_string = "";
      var sameSite_settings = '';
      var sameSite_lowercased = sameSite.toLowerCase();
      var cookie_name = name.trim();
      var domain_string = domain ? "; domain=" + domain : '';

      sameSite = sameSite || 'lax';

      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }

      cookie_string = cookie_name + "=" + value + expires + "; path=/" + domain_string;

      switch (sameSite_lowercased) {
        case 'none':
          sameSite_settings = 'SameSite=None; Secure';
          break;
        case 'strict':
          sameSite_settings = 'SameSite=Strict';
          break;
        default:
          sameSite_settings = 'SameSite=Lax';
          break;
      }

      if (sameSite_lowercased === 'none') {
        var legacy_cookie_string = cookie_name + "-legacy=" + value + expires + "; path=/" + domain_string + "; Secure";

        document.cookie = legacy_cookie_string;
      }

      cookie_string += "; " + sameSite_settings;

      document.cookie = cookie_string;
    },

    /**
     * Read Cookie and fall back to the legacy version if the original one wasn't found.
     * @function read
     * @public
     * @returns {(String|null)} - content of the given cookie or null if it wasn't found
     */
    read: function(name) {
      var name_trimmed = name.trim();
      var name_eq = name_trimmed + "=";
      var legacy_name_eq = name_trimmed + "-legacy=";
      var cookie_array = document.cookie.split(';');

      for(var i = 0; i < cookie_array.length; i++) {
        var cookie = cookie_array[i];

        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(name_eq) === 0) {
          return cookie.substring(name_eq.length, cookie.length);
        } else if (cookie.indexOf(legacy_name_eq) === 0) {
          return cookie.substring(legacy_name_eq.length, cookie.length);
        }
      }
      return null;
    },

    /**
     * Erase cookie and its legacy version.
     * @function erase
     * @public
     */
    erase: function(name) {
      var name_trimmed = name.trim();

      this.create(name_trimmed,'',-1);
      this.create(name_trimmed + '-legacy','',-1); // if it was set as legacy cookie
    }
  };

  return {
    create: Cookie.create,
    read: Cookie.read,
    erase: Cookie.erase
  };

});
