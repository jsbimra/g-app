"use strict";function ngMessageDirectiveFactory(){function e(e,n){return e?isArray(e)?e.indexOf(n)>=0:e.hasOwnProperty(n):void 0}return["$animate",function(n){return{restrict:"AE",transclude:"element",priority:1,terminal:!0,require:"^^ngMessages",link:function(t,r,s,a,i){var c,g=r[0],o=s.ngMessage||s.when,u=s.ngMessageExp||s.whenExp,l=function(e){c=e?isArray(e)?e:e.split(/[\s,]+/):null,a.reRender()};u?(l(t.$eval(u)),t.$watchCollection(u,l)):l(o);var d,f;a.register(g,f={test:function(n){return e(c,n)},attach:function(){d||i(t,function(e){n.enter(e,null,r),d=e;var t=d.$$attachId=a.getAttachId();d.on("$destroy",function(){d&&d.$$attachId===t&&(a.deregister(g),f.detach())})})},detach:function(){if(d){var e=d;d=null,n.leave(e)}}})}}}]}var isArray=angular.isArray,forEach=angular.forEach,isString=angular.isString,jqLite=angular.element;angular.module("ngMessages",[]).directive("ngMessages",["$animate",function(e){function n(e,n){return isString(n)&&0===n.length||t(e.$eval(n))}function t(e){return isString(e)?e.length:!!e}var r="ng-active",s="ng-inactive";return{require:"ngMessages",restrict:"AE",controller:["$element","$scope","$attrs",function(a,i,c){function g(e,n){for(var t=n,r=[];t&&t!==e;){var s=t.$$ngMessageNode;if(s&&s.length)return $[s];t.childNodes.length&&-1==r.indexOf(t)?(r.push(t),t=t.childNodes[t.childNodes.length-1]):t=t.previousSibling||t.parentNode}}function o(e,n,t){var r=$[t];if(l.head){var s=g(e,n);s?(r.next=s.next,s.next=r):(r.next=l.head,l.head=r)}else l.head=r}function u(e,n,t){var r=$[t],s=g(e,n);s?s.next=r.next:l.head=r.next}var l=this,d=0,f=0;this.getAttachId=function(){return f++};var h,v,$=this.messages={};this.render=function(g){g=g||{},h=!1,v=g;for(var o=n(i,c.ngMessagesMultiple)||n(i,c.multiple),u=[],d={},f=l.head,$=!1,M=0;null!=f;){M++;var m=f.message,p=!1;$||forEach(g,function(e,n){if(!p&&t(e)&&m.test(n)){if(d[n])return;d[n]=!0,p=!0,m.attach()}}),p?$=!o:u.push(m),f=f.next}forEach(u,function(e){e.detach()}),u.length!==M?e.setClass(a,r,s):e.setClass(a,s,r)},i.$watchCollection(c.ngMessages||c["for"],l.render),this.reRender=function(){h||(h=!0,i.$evalAsync(function(){h&&v&&l.render(v)}))},this.register=function(e,n){var t=d.toString();$[t]={message:n},o(a[0],e,t),e.$$ngMessageNode=t,d++,l.reRender()},this.deregister=function(e){var n=e.$$ngMessageNode;delete e.$$ngMessageNode,u(a[0],e,n),delete $[n],l.reRender()}}]}}]).directive("ngMessagesInclude",["$templateRequest","$document","$compile",function(e,n,t){return{restrict:"AE",require:"^^ngMessages",link:function(r,s,a){var i=a.ngMessagesInclude||a.src;e(i).then(function(e){t(e)(r,function(e){s.after(e);var t=jqLite(n[0].createComment(" ngMessagesInclude: "+i+" "));s.after(t),s.remove()})})}}}]).directive("ngMessage",ngMessageDirectiveFactory()).directive("ngMessageExp",ngMessageDirectiveFactory());