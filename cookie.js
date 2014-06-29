define(function() {

  'use strict';

  /************************************************************
  @description create, read, erase Cookies
  @see http://www.quirksmode.org/js/cookies.html
  *************************************************************/
  var Cookie = {
    create: function(name,value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
      }
      document.cookie = name+"="+value+expires+"; path=/";
    },
    read: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    },
    erase: function(name) {
      this.createCookie(name,'',-1);
    }
  };

  return {
    create: Cookie.create,
    read: Cookie.read,
    erase: Cookie.erase
  };

});
