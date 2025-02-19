import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slicers/accounts';
import rafflesReducer from './slicers/raffles';
import collectionReducer from './slicers/collections';
import badgeReducer from './slicers/badge';
// import tokenModalReducer from './slicers/tokenModal';
// import swapModalReducer from './slicers/swapModal';
// import poolsReducer from './slicers/pools'
// import tokensReducer from './slicers/tokens'
import txModalReducer from './slicers/txModal';
import myNftsModalReducer from './slicers/myNftsModal';

export default configureStore({
    reducer: {
      accounts: accountReducer,
      raffles: rafflesReducer,
      collections: collectionReducer,
      badge: badgeReducer,
      txModal: txModalReducer,
      myNftsModal: myNftsModalReducer
    //   pools: poolsReducer,
    //   tokens: tokensReducer,
    //   tokenModal: tokenModalReducer,
    //   swapModal: swapModalReducer
    },
  })