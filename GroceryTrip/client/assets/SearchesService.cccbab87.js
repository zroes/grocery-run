import{A as s,n as l,q as u,l as i}from"./index.fcae9d8d.js";class n{async getSearchResults(e){s.searchResults=[],s.loading=!0;const a=await l.post("api/search",e);s.loading=!1;const r=e.query[0];let c=a.data[r].map(t=>new u(t));i.log(c),s.unsortedSearchResults=c.filter(t=>t.price!=null)}async sortSearchResults(e){s.searchResults=[],s.unsortedSearchResults&&(e=="price"?s.searchResults=s.unsortedSearchResults.sort((a,r)=>a.price-r.price):s.searchResults=s.unsortedSearchResults.sort((a,r)=>a.distance-r.distance))}async searchList(e){return(await l.post("api/search",e)).data}}const p=new n;export{p as s};
