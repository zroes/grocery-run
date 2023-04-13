import { Axios } from "axios"

// import Axios from "axios";
const baseURL = 'https://api-ce.kroger.com/v1/'
export const Kroger = new Axios({
    baseURL,
    timeout: 8000,
    headers: { 'Authorization': 'Basic Z3JvY2VyeXJ1bi03YjAzNTkyYWEzZTIyY2UwOWZlZDc2MWI4YWQ1MDBhNTczODYxMzU2ODEzNTYzMjc5MDc6dE0ydm5JN19CdzlwaXdvWnplcldNcWMtd1lpeDVjRnVjVk1aYXJGNw==', 'Content-Type': 'application/x-www-form-urlencoded' }
})

