import{w as l,c as _,s as b,l as n,P as p,E as C,L as R,z as w,A as r,_ as v,b as c,d as s,e as y,f as h,j as x,F as T,u as Q,r as u,o as a}from"./index.ca740b63.js";import{s as g}from"./SearchesService.ccb032bf.js";const B={setup(){let t=w();l(()=>{r.account.id&&r.activeQuery!=t.params.searchQuery&&o()}),l(()=>{t.params.sortType,m()}),l(()=>{t.params,r.searchResults=[]});async function o(){try{r.activeQuery=t.params.searchQuery;const e={query:[t.params.searchQuery],locations:r.account.locations};await g.getSearchResults(e)}catch(e){n.error(e.message),p.error(e.message),r.loading=!1}}async function m(){try{n.log("Sorting"),await g.sortSearchResults(t.params.sortType)}catch(e){n.error(e.message),p.error(e.message)}}return{route:t,loading:_(()=>r.loading),priceCheck:!0,distanceCheck:!1,SearchResults:_(()=>r.searchResults),async setSortType(e){try{b.replace({name:"SearchResults",params:{searchQuery:t.params.searchQuery,sortType:e}}),e=="distance"?(this.priceCheck=!1,this.distanceCheck=!0):(this.priceCheck=!0,this.distanceCheck=!1)}catch(i){n.error(i.message),p.error(i.message)}}}},components:{SearchResultsItemsCard:C,Loading:R}},L={class:"container-fluid"},N={class:"row justify-content-center p-2 mt-1"},P={class:"col-3 col-md-1 text-center p-0"},j={class:"dropdown"},E=s("button",{class:"btn btn-info dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," Sort ",-1),I={class:"dropdown-menu p-0"},V={class:"d-flex"},A=s("button",{class:"dropdown-item p-0"},"Sort by Price",-1),F={key:0,class:"mdi mdi-check"},q={class:"border-bottom border-dark p-2"},z={class:"d-flex"},D={key:0,class:"mdi mdi-check"},G={class:"row justify-content-center p-2 mt-1"},H={class:"col-md-10 p-2 px-3"},J=s("p",{class:"text-light opacity-75"},"Not seeing what you want? Try a more specific search!",-1);function K(t,o,m,e,i,M){const f=u("SearchBar"),S=u("Loading"),k=u("SearchResultsItemsCard");return a(),c("div",L,[s("section",N,[y(f,{sortType:e.route.params.sortType},null,8,["sortType"]),s("div",P,[s("div",j,[E,s("ul",I,[s("li",{class:"border-bottom border-dark p-2",onClick:o[0]||(o[0]=d=>e.setSortType("price"))},[s("div",V,[A,e.priceCheck?(a(),c("i",F)):h("",!0)])]),s("li",q,[s("div",z,[s("button",{class:"dropdown-item p-0",onClick:o[1]||(o[1]=d=>e.setSortType("distance"))},"Sort by Distance"),e.distanceCheck?(a(),c("i",D)):h("",!0)])])])])])]),e.loading?(a(),x(S,{key:0})):h("",!0),s("section",G,[(a(!0),c(T,null,Q(e.SearchResults,d=>(a(),c("div",H,[y(k,{r:d},null,8,["r"])]))),256))]),J])}const W=v(B,[["render",K]]);export{W as default};
