import React, { createContext, FC, useContext } from 'react';

import global from './global';

const createStore = () => ({ global });

const storeValue = createStore();

type TStore = ReturnType<typeof createStore>;

const StoreContext = createContext<TStore | null>(null);

export const StoreProvider: FC = function ({ children }) {
    return <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>;
};

export const useStores = () => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('no store');
    }
    return store;
};
