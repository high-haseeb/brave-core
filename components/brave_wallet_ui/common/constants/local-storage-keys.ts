// Copyright (c) 2018 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.
export const LOCAL_STORAGE_KEYS = {
  IS_PORTFOLIO_OVERVIEW_GRAPH_HIDDEN:
    'BRAVE_WALLET_IS_WALLET_PORTFOLIO_OVERVIEW_GRAPH_HIDDEN',
  HIDE_PORTFOLIO_BALANCES: 'BRAVE_WALLET_HIDE_PORTFOLIO_BALANCES',
  HIDE_PORTFOLIO_NFTS_TAB: 'BRAVE_WALLET_HIDE_PORTFOLIO_NFTS_TAB',
  PORTFOLIO_ASSET_FILTER_OPTION: 'PORTFOLIO_ASSET_FILTER_OPTION',
  PORTFOLIO_TIME_LINE_OPTION: 'PORTFOLIO_TIME_LINE_OPTION',
  IS_ENABLE_NFT_AUTO_DISCOVERY_MODAL_HIDDEN:
    'BRAVE_WALLET_IS_ENABLE_NFT_AUTO_DISCOVERY_MODAL_HIDDEN',
  DEBUG: 'BRAVE_WALLET_DEBUG',
  FILTERED_OUT_PORTFOLIO_NETWORK_KEYS:
    'BRAVE_WALLET_FILTERED_OUT_PORTFOLIO_NETWORK_KEYS',
  FILTERED_OUT_PORTFOLIO_ACCOUNT_IDS:
    'BRAVE_WALLET_FILTERED_OUT_PORTFOLIO_ACCOUNT_IDS',
  HIDE_PORTFOLIO_SMALL_BALANCES: 'BRAVE_WALLET_HIDE_PORTFOLIO_SMALL_BALANCES',
  GROUP_PORTFOLIO_ASSETS_BY: 'BRAVE_WALLET_GROUP_PORTFOLIO_ASSETS_BY',
  SHOW_NETWORK_LOGO_ON_NFTS: 'BRAVE_WALLET_SHOW_NETWORK_LOGO_ON_NFTS',
  COLLAPSED_PORTFOLIO_ACCOUNT_IDS:
    'BRAVE_WALLET_COLLAPSED_PORTFOLIO_ACCOUNTS_IDS',
  COLLAPSED_PORTFOLIO_NETWORK_KEYS:
    'BRAVE_WALLET_COLLAPSED_PORTFOLIO_NETWORK_KEYS',
  CURRENT_PANEL: 'BRAVE_WALLET_CURRENT_PANEL',
  LAST_VISITED_PANEL: 'BRAVE_WALLET_LAST_VISITED_PANEL',
  TOKEN_BALANCES: 'BRAVE_WALLET_TOKEN_BALANCES4',
  SPAM_TOKEN_BALANCES: 'SPAM_TOKEN_BALANCES3',
  SAVED_SESSION_ROUTE: 'BRAVE_WALLET_SAVED_SESSION_ROUTE',
  USER_HIDDEN_TOKEN_IDS: 'BRAVE_WALLET_USER_HIDDEN_TOKEN_IDS2',
  USER_DELETED_TOKEN_IDS: 'BRAVE_WALLET_USER_DELETED_TOKEN_IDS2',
  HIDE_UNOWNED_NFTS: 'HIDE_UNOWNED_NFTS',
  GROUP_PORTFOLIO_NFTS_BY_COLLECTION: 'GROUP_PORTFOLIO_NFTS_BY_COLLECTION',
  NFT_COLLECTION_NAMES_REGISTRY: 'NFT_COLLECTION_NAMES_REGISTRY2',
  FILTERED_OUT_DAPP_NETWORK_KEYS: 'BRAVE_WALLET_FILTERED_OUT_DAPP_NETWORK_KEYS',
  FILTERED_OUT_DAPP_CATEGORIES: 'BRAVE_WALLET_FILTERED_OUT_DAPP_CATEGORIES'
} as const

const LOCAL_STORAGE_KEYS_DEPRECATED = {
  PORTFOLIO_NETWORK_FILTER_OPTION: 'PORTFOLIO_NETWORK_FILTER_OPTION',
  PORTFOLIO_ACCOUNT_FILTER_OPTION: 'PORTFOLIO_ACCOUNT_FILTER_OPTION',
  SESSION_ROUTE: 'BRAVE_WALLET_SESSION_ROUTE',
  FILTERED_OUT_PORTFOLIO_ACCOUNT_ADDRESSES:
    'BRAVE_WALLET_FILTERED_OUT_PORTFOLIO_ACCOUNT_ADDRESSES',
  COLLAPSED_PORTFOLIO_ACCOUNT_ADDRESSES:
    'BRAVE_WALLET_COLLAPSED_PORTFOLIO_ACCOUNTS_ADDRESSES',
  TOKEN_BALANCES: 'BRAVE_WALLET_TOKEN_BALANCES',
  TOKEN_BALANCES2: 'BRAVE_WALLET_TOKEN_BALANCES2',
  TOKEN_BALANCES3: 'BRAVE_WALLET_TOKEN_BALANCES3',
  SPAM_TOKEN_BALANCES: 'SPAM_TOKEN_BALANCES',
  SPAM_TOKEN_BALANCES2: 'SPAM_TOKEN_BALANCES2',
  USER_REMOVED_NON_FUNGIBLE_TOKEN_IDS:
    'BRAVE_WALLET_USER_REMOVED_NON_FUNGIBLE_TOKEN_IDS',
  USER_DELETED_NON_FUNGIBLE_TOKEN_IDS:
    'BRAVE_WALLET_USER_DELETED_NON_FUNGIBLE_TOKEN_IDS',
  USER_REMOVED_FUNGIBLE_TOKEN_IDS:
    'BRAVE_WALLET_USER_REMOVED_FUNGIBLE_TOKEN_IDS',
  USER_DELETED_TOKEN_IDS: 'BRAVE_WALLET_USER_DELETED_TOKEN_IDS',
  USER_HIDDEN_TOKEN_IDS: 'BRAVE_WALLET_USER_HIDDEN_TOKEN_IDS',
  NFT_COLLECTION_NAMES_REGISTRY: 'NFT_COLLECTION_NAMES_REGISTRY',
  IS_IPFS_BANNER_HIDDEN: 'BRAVE_WALLET_IS_IPFS_BANNER_HIDDEN'
}

const removeDeprecatedLocalStorageKeys = () => {
  Object.keys(LOCAL_STORAGE_KEYS_DEPRECATED).forEach(
    (key: keyof typeof LOCAL_STORAGE_KEYS_DEPRECATED) => {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS_DEPRECATED[key])
    }
  )
}

export const runLocalStorageMigrations = () => {
  migrateTokenIds()
  removeDeprecatedLocalStorageKeys()
}

function migrateTokenIds() {
  const oldUserHiddenTokenIds: string[] = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS_DEPRECATED.USER_HIDDEN_TOKEN_IDS) ||
      '[]'
  )
  const oldUserDeletedTokenIds: string[] = JSON.parse(
    localStorage.getItem(
      LOCAL_STORAGE_KEYS_DEPRECATED.USER_DELETED_TOKEN_IDS
    ) || '[]'
  )
  if (oldUserHiddenTokenIds.length) {
    const newKeys = oldUserHiddenTokenIds.map((entry) => entry.toLowerCase())
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER_HIDDEN_TOKEN_IDS,
      JSON.stringify(newKeys)
    )
    localStorage.removeItem(LOCAL_STORAGE_KEYS_DEPRECATED.USER_HIDDEN_TOKEN_IDS)
  }
  if (oldUserDeletedTokenIds.length) {
    const newKeys = oldUserDeletedTokenIds.map((entry) => entry.toLowerCase())
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER_DELETED_TOKEN_IDS,
      JSON.stringify(newKeys)
    )
    localStorage.removeItem(
      LOCAL_STORAGE_KEYS_DEPRECATED.USER_DELETED_TOKEN_IDS
    )
  }
}
