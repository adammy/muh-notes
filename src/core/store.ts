import { configureStore } from '@reduxjs/toolkit';

import notebooksReducer from '@/notebooks/slice';
import notesReducer from '@/notes/slice';

export const store = configureStore({
	reducer: {
		notebooks: notebooksReducer,
		notes: notesReducer
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
			serializableCheck: false
		})
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type
export type AppDispatch = typeof store.dispatch;
