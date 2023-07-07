import { Axios } from "axios"

// import Axios from "axios";
const krogerURL = 'https://api-ce.kroger.com/v1/'
export const Kroger = new Axios({
  baseURL: krogerURL,
  timeout: 8000,
  headers: { 'Authorization': 'Basic Z3JvY2VyeXJ1bi03YjAzNTkyYWEzZTIyY2UwOWZlZDc2MWI4YWQ1MDBhNTczODYxMzU2ODEzNTYzMjc5MDc6RHhMSVFsakJhTzR0SEg5d1ZWMWQ4VDRMRWE0bGxTOFk0Z3FucHVpNg==', 'Content-Type': 'application/x-www-form-urlencoded' }
})


const AlbertsonsURL = 'https://www.albertsons.com/abs/pub/xapi'
let l = '/storeresolver/v2/all'
export const Albertsons = new Axios({
  baseURL: AlbertsonsURL,
  timeout: 8000,
  headers: {
    'ocp-apim-subscription-key': '7bad9afbb87043b28519c4443106db06'
  }


})

