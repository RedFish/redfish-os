(this["webpackJsonpredfish-os"]=this["webpackJsonpredfish-os"]||[]).push([[6],{175:function(e,t,n){"use strict";n.r(t);var a=n(26),c=n(0),s=n.n(c),i=n(146),o=n(154),r=n(176),l=n(123),u=n(177),j=n(182),h=n(155),d=n(149),b=n(157),p=n(183),m=n(65),g=n(179),O=n(167),f=n(150),x=n(153),k=n(33),v=n(14),w=n(39),N=n(15),C=n(185),_=n(178),y=n(2),R=Object(i.a)((function(e){return{root:{position:"absolute",top:0,left:0,right:0,bottom:0},noPadding:{padding:0},header:{background:"white",paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},sorting:{marginRight:e.spacing(2)},list:{position:"absolute",padding:0,top:0,left:0,right:0,bottom:0,overflow:"scroll"},itemText:{paddingRight:60},playIconButton:{marginRight:10},languageChip:{marginRight:3},itemFooter:{marginTop:3,marginBottom:3}}}));t.default=Object(v.b)((function(e){return{}}),(function(e){return{openTask:function(t){return e(Object(N.c)(t))}}}))((function(e){var t=e.openTask,n=R(),i=Object(c.useContext)(k.a),v=i.componentProps,N=i.handleUpdateTaskComponent,T=v.repos,P=v.runnableOnly,B=v.sorting;Object(c.useEffect)((function(){fetch(new Request(v.apiUrl)).then((function(e){return e.json()})).then((function(e){N({repos:e})})).catch((function(e){}))}),[v.apiUrl,N]);var D=Object(c.useMemo)((function(){var e=Object(a.a)(T||[]);switch(P&&(e=e.filter((function(e){return e.has_pages}))),B){case"name":e.sort((function(e,t){return e.name<t.name?-1:e.name>t.name?1:0}));break;case"date":e.sort((function(e,t){return e.pushed_at<t.pushed_at?1:e.pushed_at>t.pushed_at?-1:0}))}return e}),[T,P,B]);return Object(y.jsx)("div",{className:n.root,children:Object(y.jsxs)(o.a,{className:n.list,dense:!0,children:[Object(y.jsx)(r.a,{className:n.noPadding,children:Object(y.jsxs)(l.a,{className:n.header,children:[Object(y.jsx)(u.a,{className:n.sorting,control:Object(y.jsxs)(C.a,{size:"small",exclusive:!0,value:B||"name",onChange:function(e,t){t&&N({sorting:t})},children:[Object(y.jsx)(_.a,{value:"name",children:"Nom"}),Object(y.jsx)(_.a,{value:"date",children:"Date"})]}),label:"Tri par",labelPlacement:"start"}),Object(y.jsx)(u.a,{control:Object(y.jsx)(j.a,{checked:P||!1,onChange:function(e){N({runnableOnly:e.target.checked})}}),label:'Executable "RedfishOS" ',labelPlacement:"start"})]})}),D.map((function(e,a){return Object(y.jsxs)(s.a.Fragment,{children:[Object(y.jsxs)(h.a,{children:[Object(y.jsxs)(d.a,{container:!0,direction:"column",justifyContent:"center",alignItems:"flex-start",children:[Object(y.jsx)(d.a,{item:!0,className:n.itemText,children:Object(y.jsx)(b.a,{primary:e.name,secondary:e.description})}),Object(y.jsxs)(d.a,{item:!0,className:n.itemFooter,children:[e.language&&Object(y.jsx)(p.a,{className:n.languageChip,label:e.language,size:"small"}),Object(y.jsx)(m.a,{variant:"caption",children:new Date(e.pushed_at).toLocaleDateString()})]})]}),Object(y.jsxs)(g.a,{children:[e.has_pages&&Object(y.jsx)(O.a,{title:"Lancer",children:Object(y.jsx)(f.a,{className:n.playIconButton,onClick:function(){t({component:"WebView",componentProps:{appname:e.name,url:"https://redfish.github.io/".concat(e.name)}})},children:Object(y.jsx)(w.a,{icon:"play-circle",color:"#266904"})})}),e.html_url&&Object(y.jsx)(O.a,{title:"Voir sur GitHub",children:Object(y.jsx)(f.a,{onClick:function(){window.open(e.html_url)},children:Object(y.jsx)(w.a,{icon:["fab","github"],color:"#212121"})})})]})]}),Object(y.jsx)(x.a,{})]},a)}))]})})}))}}]);
//# sourceMappingURL=6.545f44c6.chunk.js.map