import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/SearchResult.js').SearchResult[]} */
  searchResults: [],

  /** @type {import('./models/SearchResult.js').SearchResult[]} */
  filteredArray: [],

  /** @type {import('./models/SearchResult.js').tripItem[]} */
  fredMeyerTripItems: null,

  /** @type {import('./models/SearchResult.js').tripItem[]} */
  genericTripItems: null,

  toggle: false,
  activeGroceryList: null,
  activeGroceryListItems: [],
  groceryLists: [],
  locations: null,

})
