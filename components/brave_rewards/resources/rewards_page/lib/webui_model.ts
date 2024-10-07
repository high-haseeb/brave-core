/* Copyright (c) 2024 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

import { loadTimeData } from 'chrome://resources/js/load_time_data.js'

import {
  externalWalletFromExtensionData,
  ExternalWalletProvider,
  externalWalletProviderFromString
} from '../../shared/lib/external_wallet'

import { AppModel, AppState, AdType, defaultState } from './app_model'
import { RewardsPageProxy } from './rewards_page_proxy'
import { createStateManager } from '../../shared/lib/state_manager'
import { createAdsHistoryAdapter } from './ads_history_adapter'
import { optional } from '../../shared/lib/optional'
import * as mojom from './mojom'

function normalizePlatform(name: string) {
  switch (name) {
    case 'android':
    case 'desktop':
      return name
  }
  console.error('Invalid platform name: ' + name)
  return 'desktop'
}

function convertAdType(adType: AdType) {
  switch (adType) {
    case 'new-tab-page': return mojom.AdType.kNewTabPageAd
    case 'notification': return mojom.AdType.kNotificationAd
    case 'search-result': return mojom.AdType.kSearchResultAd
    case 'inline-content': return mojom.AdType.kInlineContentAd
  }
}

function parseCreatorPlatform(value: string) {
  switch (value) {
    case 'twitter':
    case 'youtube':
    case 'twitch':
    case 'reddit':
    case 'vimeo':
    case 'github':
      return value
  }
  return ''
}

function convertMojoTime(time: any) {
  return (Number(time?.internalValue) / 1000 - Date.UTC(1601, 0, 1)) || 0
}

export function createModel(): AppModel {
  const browserProxy = RewardsPageProxy.getInstance()
  const pageHandler = browserProxy.handler
  const adsHistoryAdapter = createAdsHistoryAdapter()
  const stateManager = createStateManager<AppState>(defaultState())
  const isBubble = loadTimeData.getBoolean('isBubble')

  // Expose the state manager for devtools diagnostic purposes.
  Object.assign(self, {
    [Symbol.for('stateManager')]: stateManager
  })

  stateManager.update({
    embedder: {
      isBubble,
      platform: normalizePlatform(loadTimeData.getString('platform')),
      animatedBackgroundEnabled:
        loadTimeData.getBoolean('animatedBackgroundEnabled')
    }
  })

  async function updatePaymentId() {
    const { paymentId } = await pageHandler.getRewardsPaymentId()
    stateManager.update({ paymentId })
  }

  async function updateCountryCode() {
    const { countryCode } = await pageHandler.getCountryCode()
    stateManager.update({ countryCode })
  }

  async function updateExternalWallet() {
    const { externalWallet } = await pageHandler.getExternalWallet()
    stateManager.update({
      externalWallet: externalWalletFromExtensionData(externalWallet)
    })
  }

  async function updateBalance() {
    const { balance } = await pageHandler.getAvailableBalance()
    stateManager.update({
      balance: typeof balance === 'number' ? optional(balance) : optional()
    })
  }

  async function updateAdsInfo() {
    const [{ statement }, { settings }] = await Promise.all([
      await pageHandler.getAdsStatement(),
      await pageHandler.getAdsSettings()
    ])

    if (statement && settings) {
      stateManager.update({
        adsInfo: {
          adsEnabled: {
            'new-tab-page': settings.newTabPageAdsEnabled,
            'notification': settings.notificationAdsEnabled,
            'search-result': settings.searchAdsEnabled,
            'inline-content': settings.inlineContentAdsEnabled
          },
          adsReceivedThisMonth: statement.adsReceivedThisMonth,
          adTypesReceivedThisMonth: {
            'new-tab-page':
              Number(statement.adsSummaryThisMonth.new_tab_page_ad) || 0,
            'notification':
              Number(statement.adsSummaryThisMonth.ad_notification) || 0,
            'search-result':
              Number(statement.adsSummaryThisMonth.search_result_ad) || 0,
            'inline-content':
              Number(statement.adsSummaryThisMonth.inline_content_ad) || 0,
          },
          minEarningsThisMonth: statement.minEarningsThisMonth,
          maxEarningsThisMonth: statement.maxEarningsThisMonth,
          nextPaymentDate: convertMojoTime(statement.nextPaymentDate),
          notificationAdsPerHour: settings.notificationAdsPerHour,
          shouldAllowSubdivisionTargeting:
            settings.shouldAllowSubdivisionTargeting,
          currentSubdivision: settings.currentSubdivision,
          availableSubdivisions: settings.availableSubdivisions,
          autoDetectedSubdivision: settings.autoDetectedSubdivision
        }
      })
    } else {
      stateManager.update({ adsInfo: null })
    }
  }

  async function updateRewardsParameters() {
    const { rewardsParameters } = await pageHandler.getRewardsParameters()
    stateManager.update({ rewardsParameters })
  }

  async function updateAutoContributeInfo() {
    const [{ settings }, { sites }] = await Promise.all([
      pageHandler.getAutoContributeSettings(),
      pageHandler.getAutoContributeSites()
    ])

    if (!settings) {
      stateManager.update({ autoContributeInfo: null })
      return
    }

    stateManager.update({
      autoContributeInfo: {
        ...settings,
        entries: sites.map((item) => ({
          site: {
            id: item.id,
            icon: item.faviconUrl,
            name: item.name,
            url: item.url,
            platform: parseCreatorPlatform(item.provider)
          },
          attention: item.percent / 100
        }))
      }
    })
  }

  async function updateRecurringContributions() {
    const { contributions } = await pageHandler.getRecurringContributions()
    stateManager.update({
      recurringContributions: contributions.map((item) => ({
        site: {
          id: item.id,
          icon: item.faviconUrl,
          name: item.name,
          url: item.url,
          platform: parseCreatorPlatform(item.provider)
        },
        amount: item.weight,
        nextContributionDate: Number(item.reconcileStamp) * 1000
      }))
    })
  }

  async function updateCurrentCreator() {
    const [{ publisherInfo }, { publisherBanner }] = await Promise.all([
      pageHandler.getPublisherForActiveTab(),
      pageHandler.getPublisherBannerForActiveTab()
    ])

    if (!publisherInfo) {
      stateManager.update({ currentCreator: null })
      return
    }

    stateManager.update({
      currentCreator: {
        site: {
          id: publisherInfo.id,
          icon: publisherInfo.faviconUrl,
          name: publisherInfo.name,
          url: publisherInfo.url,
          platform: parseCreatorPlatform(publisherInfo.provider)
        },
        banner: {
          title: publisherBanner?.title || '',
          description: publisherBanner?.description || '',
          background: publisherBanner?.background || ''
        }
      }
    })
  }

  async function loadData() {
    // Discards the supplied promise so that the `Promise.all` below does not
    // block on the result. Any calls that may be blocked on a network request
    // should be wrapped with this decorator.
    const inBackground = (promise: Promise<unknown>) => null

    await Promise.all([
      updatePaymentId(),
      updateCountryCode(),
      updateExternalWallet(),
      inBackground(updateBalance()),
      updateAdsInfo(),
      updateRecurringContributions(),
      updateAutoContributeInfo(),
      updateRewardsParameters(),
      inBackground(updateCurrentCreator())
    ])

    stateManager.update({ loading: false })
  }

  browserProxy.callbackRouter.onRewardsStateUpdated.addListener(() => {
    loadData()
  })

  // When displayed in a bubble, this page may be cached. In order to reset the
  // view state when the bubble is re-opened with cached contents, we update the
  // "openTime" state when the document visibility changes and reload data.
  if (isBubble) {
    document.addEventListener('visibilitychange', () => {
      const now = Date.now()
      const { openTime } = stateManager.getState()
      if (now - openTime > 100) {
        stateManager.update({ openTime: now })
        loadData()
      }
    })
  }

  loadData()

  return {
    getState: stateManager.getState,

    addListener: stateManager.addListener,

    onAppRendered() {
      pageHandler.onPageReady()
    },

    openTab(url) {
      if (isBubble) {
        pageHandler.openTab(url)
        return
      }
      window.open(url, '_blank', 'noopener,noreferrer')
    },

    getString(key) {
      return loadTimeData.getString(key)
    },

    async getPluralString(key, count) {
      const { pluralString } = await pageHandler.getPluralString(key, count)
      return pluralString
    },

    async enableRewards(countryCode) {
      const { result } = await pageHandler.enableRewards(countryCode)
      switch (result) {
        case mojom.CreateRewardsWalletResult.kSuccess:
          updatePaymentId()
          return 'success'
        case mojom.CreateRewardsWalletResult.kWalletGenerationDisabled:
          return 'wallet-generation-disabled'
        case mojom.CreateRewardsWalletResult.kGeoCountryAlreadyDeclared:
          return 'country-already-declared'
        case mojom.CreateRewardsWalletResult.kUnexpected:
          return 'unexpected-error'
        default:
          console.error('Unrecognized result value ' + result)
          return 'unexpected-error'
      }
    },

    async getAvailableCountries() {
      const { availableCountries } = await pageHandler.getAvailableCountries()
      return availableCountries
    },

    async getExternalWalletProviders() {
      const providers: ExternalWalletProvider[] = []
      const result = await pageHandler.getExternalWalletProviders()
      for (const key of result.providers) {
        const provider = externalWalletProviderFromString(key)
        if (provider) {
          providers.push(provider)
        }
      }
      return providers
    },

    async beginExternalWalletLogin(provider) {
      const { params } = await pageHandler.beginExternalWalletLogin(provider)
      if (!params) {
        return false
      }
      if (isBubble) {
        pageHandler.openTab(params.url)
      } else {
        window.open(params.url, '_self', 'noreferrer')
      }
      return true
    },

    async connectExternalWallet(provider, args) {
      const ResultType = mojom.ConnectExternalWalletResult
      const { result } = await pageHandler.connectExternalWallet(provider, args)
      switch (result) {
        case ResultType.kSuccess:
          return 'success'
        case ResultType.kDeviceLimitReached:
          return 'device-limit-reached'
        case ResultType.kFlaggedWallet:
          return 'flagged-wallet'
        case ResultType.kKYCRequired:
          return 'kyc-required'
        case ResultType.kMismatchedCountries:
          return 'mismatched-countries'
        case ResultType.kMismatchedProviderAccounts:
          return 'mismatched-provider-accounts'
        case ResultType.kProviderUnavailable:
          return 'provider-unavailable'
        case ResultType.kRegionNotSupported:
          return 'region-not-supported'
        case ResultType.kRequestSignatureVerificationFailure:
          return 'request-signature-verification-error'
        case ResultType.kUnexpected:
          return 'unexpected-error'
        case ResultType.kUpholdBATNotAllowed:
          return 'uphold-bat-not-allowed'
        case ResultType.kUpholdInsufficientCapabilities:
          return 'uphold-insufficient-capabilities'
        case ResultType.kUpholdTransactionVerificationFailure:
          return 'uphold-transaction-verification-failure'
        default:
          console.error('Unrecognized result value ' + result)
          return 'unexpected-error'
      }
    },

    async resetRewards() {
      await pageHandler.resetRewards()
    },

    async setAdTypeEnabled(adType, enabled) {
      // Before sending the update request to the browser, update the local app
      // state in order to avoid any jitter with nala toggles.
      const { adsInfo } = stateManager.getState()
      if (adsInfo) {
        adsInfo.adsEnabled[adType] = enabled
        stateManager.update({ adsInfo })
      }
      await pageHandler.setAdTypeEnabled(convertAdType(adType), enabled);
    },

    async setNotificationAdsPerHour(adsPerHour) {
      await pageHandler.setNotificationAdsPerHour(adsPerHour);
    },

    async setAdsSubdivision(subdivision) {
      await pageHandler.setAdsSubdivision(subdivision);
    },

    async getAdsHistory() {
      const { history } = await pageHandler.getAdsHistory()
      adsHistoryAdapter.parseData(history)
      return adsHistoryAdapter.getItems()
    },

    async setAdLikeStatus(id, status) {
      const detail = adsHistoryAdapter.getRawDetail(id)
      const previous = adsHistoryAdapter.setAdLikeStatus(id, status)
      switch (status || previous) {
        case 'liked':
          await pageHandler.toggleAdLike(detail)
          break
        case 'disliked':
          await pageHandler.toggleAdDislike(detail)
          break
      }
    },

    async setAdInappropriate(id, value) {
      const detail = adsHistoryAdapter.getRawDetail(id)
      adsHistoryAdapter.setInappropriate(id, value)
      await pageHandler.toggleAdInappropriate(detail)
    },

    async setAutoContributeEnabled(enabled) {
      await pageHandler.setAutoContributeEnabled(enabled)
      updateAutoContributeInfo()
    },

    async setAutoContributeAmount(amount) {
      await pageHandler.setAutoContributeAmount(amount)
      updateAutoContributeInfo()
    },

    async removeAutoContributeSite(id) {
      await pageHandler.removeAutoContributeSite(id)
    },

    async removeRecurringContribution(id) {
      await pageHandler.removeRecurringContribution(id)
      updateRecurringContributions()
    }
  }
}
