_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[10],{"20a2":function(e,t,c){e.exports=c("nOHt")},"3bhu":function(e,t,c){"use strict";c.d(t,"a",(function(){return o}));var n=c("nKUr"),s=c("g4pe"),r=c.n(s),a=c("YFqc"),l=c.n(a),i=c("20a2");function o(e){var t=Object(i.useRouter)();return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)(r.a,{children:[Object(n.jsx)("title",{children:e.title}),Object(n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),Object(n.jsx)("header",{className:"text-white text-lg",children:Object(n.jsxs)("div",{className:"p-3 flex flex-row items-center",children:[Object(n.jsx)("div",{className:"mr-10",children:Object(n.jsx)(l.a,{href:"/",children:Object(n.jsx)("img",{src:"/shine.png",height:50,width:50})})}),[{route:"/standings",label:"Standings"},{route:"/schedule",label:"Schedule"}].map((function(e){return Object(n.jsx)("div",{className:"mr-10"+(t.pathname==e.route?" font-bold":""),children:Object(n.jsx)(l.a,{href:e.route,children:e.label})},e.label)}))]})})]})}},SZEZ:function(e,t,c){"use strict";c.d(t,"a",(function(){return s}));var n=c("nKUr");function s(e){var t=function(e){switch(e){case"SunshineCommunity":return{pictureUri:"/sunshinecommunity.png",twitchLink:"https://twitch.tv/sunshinecommunity"};case"Bingothon":return{pictureUri:"/bingothon.png",twitchLink:"https://twitch.tv/bingothon"}}}(e.channel),c=t.pictureUri,s=t.twitchLink;return Object(n.jsx)("div",{className:"relative h-10 w-10",children:Object(n.jsxs)("a",{href:s,children:[Object(n.jsx)("img",{src:c}),Object(n.jsx)("img",{src:"/TwitchGlitchPurple.svg",className:"absolute h-3 w-3 bottom-0 left-0"})]})})}},V2cG:function(e,t,c){"use strict";c.r(t),c.d(t,"__N_SSG",(function(){return x})),c.d(t,"default",(function(){return f}));var n=c("nKUr");function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var c=0,n=new Array(t);c<t;c++)n[c]=e[c];return n}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var c=[],n=!0,s=!1,r=void 0;try{for(var a,l=e[Symbol.iterator]();!(n=(a=l.next()).done)&&(c.push(a.value),!t||c.length!==t);n=!0);}catch(i){s=!0,r=i}finally{try{n||null==l.return||l.return()}finally{if(s)throw r}}return c}}(e,t)||function(e,t){if(e){if("string"===typeof e)return s(e,t);var c=Object.prototype.toString.call(e).slice(8,-1);return"Object"===c&&e.constructor&&(c=e.constructor.name),"Map"===c||"Set"===c?Array.from(e):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?s(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var a=c("3bhu"),l=c("q1tI"),i=c.n(l),o=c("uh5Q"),h=c("SZEZ");function u(e){return Object(n.jsx)("div",{className:"flex flex-row justify-center",children:e.isExpanded?Object(n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"currentColor",viewBox:"0 0 16 16",children:[Object(n.jsx)("path",{d:"M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"}),Object(n.jsx)("path",{d:"M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"})]}):Object(n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"currentColor",viewBox:"0 0 16 16",children:[Object(n.jsx)("path",{d:"M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.027 7.027 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.088z"}),Object(n.jsx)("path",{d:"M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.707z"})]})})}var d=c("VHJn");function m(e){var t,c,s=e.match,a=r(i.a.useState(!1),2),l=a[0],m=a[1],j=i.a.useCallback((function(){m(!l)}),[l]),b=l||"played"==s.status&&e.forceSpoilers,x="";return s.matchTime?(c=Object(d.a)(s.matchTime),Object(o.a)(1e3*s.matchTime)||(x+=" text-gray-400")):c="TBD","played"==s.status?x+=" bg-blue-500":"unscheduled"==s.status?x+=" bg-red-300":"scheduled"==s.status&&(x+=" bg-yellow-500"),Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("tr",{onClick:"played"==s.status?j:void 0,className:"h-8 sm:h-12 lg:h-16 bg-opacity-40"+x,children:[Object(n.jsx)("td",{className:"hidden sm:table-cell",children:"played"==s.status&&Object(n.jsx)(u,{isExpanded:b})}),Object(n.jsx)("td",{children:c}),Object(n.jsx)("td",{className:"text-right"+(b&&s.homePlayer==s.winner?" font-bold":""),children:s.homePlayer}),Object(n.jsx)("td",{children:"Vs."}),Object(n.jsx)("td",{className:"text-left"+(b&&s.awayPlayer==s.winner?" font-bold":""),children:s.awayPlayer}),Object(n.jsx)("td",{className:"hidden sm:table-cell",children:s.division}),Object(n.jsx)("td",{children:null!==(t=s.format)&&void 0!==t?t:"TBD"}),Object(n.jsx)("td",{children:s.channel?"Offline"==s.channel?"Offline":Object(n.jsx)("div",{className:"flex flex-row justify-center",children:Object(n.jsx)(h.a,{channel:s.channel})}):"TBD"})]}),b&&Object(n.jsxs)("tr",{className:"h-16 bg-opacity-40 bg-blue-500",children:[Object(n.jsx)("td",{className:"hidden sm:table-cell"}),Object(n.jsx)("td",{children:"Final Score:"}),Object(n.jsx)("td",{className:"text-right",children:s.homeScore}),Object(n.jsx)("td",{className:"text-center",children:" - "}),Object(n.jsx)("td",{className:"text-left",children:s.awayScore}),Object(n.jsx)("td",{className:"hidden sm:table-cell"}),Object(n.jsx)("td",{}),Object(n.jsx)("td",{children:Object(n.jsx)("a",{target:"_blank",href:s.matchVod,children:"Match Vod"})})]})]})}function j(e){return Object(n.jsxs)("div",{className:"text-white",children:[Object(n.jsx)("div",{className:"mx-auto text-3xl text-center mb-5 font-bold",children:e.tableTitle}),Object(n.jsxs)("table",{className:"w-full mx-auto table-auto sm:table-fixed",children:[Object(n.jsx)("thead",{className:"text-xs sm:text-sm md:text-lg lg:text-2xl bg-opacity-40 bg-yellow-700",children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{className:"hidden sm:w-1/12 sm:table-cell"}),Object(n.jsx)("th",{className:"w-1/12 sm:w-2/12 mx-2",children:"Time"}),Object(n.jsx)("th",{className:"w-3/12 sm:w-2/13 mx-2 text-right",children:e.hideHomeAway?"":"Home"}),Object(n.jsx)("th",{className:"w-1/12"}),Object(n.jsx)("th",{className:"w-3/12 sm:w-2/13 text-left mx-2",children:e.hideHomeAway?"":"Away"}),Object(n.jsx)("th",{className:"w-1/12 mx-2 hidden sm:table-cell",children:"Division"}),Object(n.jsx)("th",{className:"w-2/12 mx-2",children:"Format"}),Object(n.jsx)("th",{className:"w-2/12 mx-2",children:"Channel"})]})}),Object(n.jsx)("tbody",{className:"text-center text-xs sm:text-sm md:text-lg lg:text-xl",children:e.matches.length>0&&e.matches.map((function(t){return Object(n.jsx)(m,{match:t,forceSpoilers:e.forceSpoilers},t.homePlayer+t.awayPlayer)}))})]})]})}var b=c("20a2"),x=!0;function f(e){var t=Object(b.useRouter)(),c=r(i.a.useState(!!t.query.scheduled),2),s=c[0],l=c[1],o=r(i.a.useState("all"),2),h=o[0],u=o[1],d=r(i.a.useState(!1),2),m=d[0],x=d[1],f=i.a.useCallback((function(e){l(e.currentTarget.checked)}),[]),w=i.a.useCallback((function(e){x(e.currentTarget.checked)}),[]),g=i.a.useCallback((function(e){u(e.currentTarget.value)}),[]),p=new Map,v=e.matches;switch(h){case"all":break;default:v=v.filter((function(e){return e.division==h}))}s?p.set(0,v.filter((function(e){return"scheduled"==e.status}))):v.forEach((function(e){p.has(e.week)?p.get(e.week).push(e):p.set(e.week,[e])}));var y=Array.from(p.keys()).sort((function(e,t){return e-t}));return Array.from(p.keys()).forEach((function(e){p.get(e).sort((function(e,t){return e.matchTime?t.matchTime?e.matchTime-t.matchTime:-1:1}))})),Object(n.jsxs)("div",{className:"bg-tile-background bg-repeat min-h-screen overflow-x-auto",children:[Object(n.jsx)(a.a,{title:"Super Mario Sunshine Bingo league - Schedule"}),Object(n.jsxs)("main",{className:"text-white flex flex-col",children:[Object(n.jsxs)("div",{className:"flex flex-row items-baseline text-sm",children:[Object(n.jsxs)("div",{className:"mx-5",children:[Object(n.jsx)("input",{type:"checkbox",defaultChecked:s,id:"fullSchedule",onClick:f}),Object(n.jsx)("label",{className:"ml-5 text-sm sm:text-lg",htmlFor:"fullSchedule",children:"Show Scheduled Matches Only"})]}),Object(n.jsxs)("div",{className:"mx-5",children:[Object(n.jsxs)("select",{className:"text-black",name:"divisions",id:"division-select",onChange:g,children:[Object(n.jsx)("option",{value:"all",children:"All"}),e.divisions&&e.divisions.length>0&&e.divisions.map((function(e){return Object(n.jsx)("option",{value:e,children:e},e)}))]}),Object(n.jsx)("label",{className:"ml-5 text-sm sm:text-lg",htmlFor:"division-select",children:"Division Filter"})]}),Object(n.jsxs)("div",{className:"mx-5",children:[Object(n.jsx)("input",{type:"checkbox",id:"forceSpoilers",onClick:w}),Object(n.jsx)("label",{className:"ml-5 text-sm sm:text-lg",htmlFor:"forceSpoilers",children:"Force Spoilers to Show"})]})]}),Object(n.jsx)("div",{className:"sm:w-10/12 sm:mx-auto",children:y.map((function(e){return Object(n.jsx)("div",{className:"mt-5",children:Object(n.jsx)(j,{forceSpoilers:m,matches:p.get(e),tableTitle:O(e),hideHomeAway:5==e})},O(e))}))})]})]})}function O(e){switch(e){case 0:return"Upcoming Matches";case 5:return"Week 5: Neutral Week";case 9:return"Week 1-3 Extra Match";case 10:return"Week 4-5 Extra Match";case 11:return"Week 6-8 Extra Match";default:return"Week "+e}}},VHJn:function(e,t,c){"use strict";function n(e){var t=new Date(1e3*e);return t.toLocaleDateString(void 0,{month:"numeric",day:"numeric"})+"\n\r"+t.toLocaleTimeString(void 0,{hour:"numeric",minute:"numeric"})}c.d(t,"a",(function(){return n}))},j9qI:function(e,t,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/schedule",function(){return c("V2cG")}])},uh5Q:function(e,t,c){"use strict";function n(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function s(e){n(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"===typeof e||"[object Number]"===t?new Date(e):("string"!==typeof e&&"[object String]"!==t||"undefined"===typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(e){return n(1,arguments),s(e).getTime()>Date.now()}c.d(t,"a",(function(){return r}))}},[["j9qI",0,1,2,3]]]);