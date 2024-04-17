import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersAPI } from './store/api';
import trades from './store/services/tradesReducer';
import auth from './store/services/usersReducer';
import logs from './store/services/logsReducer';
import filters from './store/services/filtersReducer';
export const store = configureStore({
  reducer: {
    trades,
    auth,
    logs,
    filters,
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersAPI.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)




