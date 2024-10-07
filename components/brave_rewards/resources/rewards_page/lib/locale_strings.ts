/* Copyright (c) 2024 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import { Locale, LocaleContext } from '../../shared/lib/locale_context'

export const localeStrings = {
  acAmountLabel: 'You will send',
  acAmountText: 'Up to $1 BAT',
  acAttentionLabel: 'Attention',
  acDisabledText: 'An automatic way to support websites and content creators, based on how much time you spend on their content.',
  acDisabledTitle: 'Auto-Contribute is disabled',
  acEmptyListText: 'Verified creators that you visit will appear here as you browse.',
  acInfoText: 'Auto-contribute automatically sends monthly contributions to creators verified with Brave, based on how much time you spend on their content.',
  acInfoTitle: 'How does Auto-Contribute work?',
  acNextContributionLabel: 'Next contribution date',
  acSiteCountLabel: 'Sites viewed',
  acSiteLabel: 'Site',
  acTitle: 'Auto-Contribute',
  adsHistoryButtonLabel: '30-day Ads History',
  adsHistoryMarkInappropriateLabel: 'Mark as inappropriate',
  adsHistoryEmptyText: 'There is currently no Brave Ads history.',
  adsHistoryTitle: 'Ads history',
  adsHistoryText: 'Ads you\'ve received in the past 30 days',
  adsSettingsAdsPerHourNoneText: 'None',
  adsSettingsAdsPerHourText: 'Max $1/hr',
  adsSettingsAdTypeTitle: 'Ad type',
  adsSettingsAdViewsTitle: 'Views this month',
  adsSettingsButtonLabel: 'Ads Settings',
  adsSettingsEarningsLabel: 'Earnings so far this month',
  adsSettingsPayoutDateLabel: 'Next earnings payout date',
  adsSettingsTotalAdsLabel: 'Total ads received this month',
  adsSettingsNewsOffTooltip: 'Brave News is currently disabled.',
  adsSettingsNewsOnTooltip: 'Brave News contains ads that cannot be independently disabled.',
  adsSettingsSearchConnectedTooltip: 'You cannot earn BAT from Brave Search Ads yet, but you help support Brave by having them on.',
  adsSettingsSearchTooltip: 'Brave Search Ads appear on $1Brave Search$2.',
  adsSettingsSubdivisionLabel: 'Regional ad relevance',
  adsSettingsSubdivisionText: 'This allows Brave to show you ads meant specifically for your region.',
  adsSettingsSubdivisionDisabledLabel: 'Disabled',
  adsSettingsSubdivisionAutoLabel: 'Auto-detect',
  adsSettingsTitle: 'Ads settings',
  adsSettingsText: 'Control what kinds of Brave Ads you see, and how often. The more you see, the more you can earn.',
  adTypeInlineContentLabel: 'Brave News ads',
  adTypeNewTabPageLabel: 'New tab page ads',
  adTypeNotificationLabel: 'Notification ads',
  adTypeOffLabel: 'Off',
  adTypeOnLabel: 'On',
  adTypeSearchResultLabel: 'Search ads',
  appErrorTitle: 'Something went wrong',
  authorizeDeviceLimitReachedText: 'You\'ve reached the maximum device limit for this $1 account.',
  authorizeDeviceLimitReachedTitle: 'Device limit reached',
  authorizeErrorTitle: 'Error',
  authorizeFlaggedWalletText1: 'Unfortunately, your Brave Rewards profile was flagged because our automated checks found some unexpected Brave Ads activity.',
  authorizeFlaggedWalletText2: 'While your profile is flagged, you may continue to see ads, but won\'t be eligible to receive payouts. You also won\'t be able to connect a custodial account to Brave Rewards.',
  authorizeFlaggedWalletText3: 'It\'s possible your profile was flagged in error, and no immediate action is required on your part. The flag on your profile may be removed in the future.',
  authorizeFlaggedWalletText4: 'Learn more about Brave\'s process for flagging Rewards profiles.',
  authorizeFlaggedWalletTitle: 'Brave Rewards profile is flagged',
  authorizeKycRequiredText: 'Please try again after you have completed ID verification on $1.',
  authorizeKycRequiredTitle: 'You need a verified account to log in',
  authorizeMismatchedCountriesText: 'Hmm, it looks like your Brave Rewards country does not match the country of the $1 account you\'re trying to connect.',
  authorizeMismatchedCountriesTitle: 'Country mismatch',
  authorizeMismatchedProviderAccountsText: 'Hmm, it looks like your Brave Rewards has already been verified with another $1 account. Please try verifying again using your previous account.',
  authorizeMismatchedProviderAccountsTitle: 'Different account',
  authorizeProcessingText: 'Your request is still being processed, please wait.',
  authorizeProviderUnavailableTitle: 'Connecting to selected custodian temporarily unavailable',
  authorizeProviderUnavailableText1: 'It looks like connecting $1 to Brave Rewards is temporarily unavailable. Please try again later.',
  authorizeProviderUnavailableText2: 'You can view $2service status here$3.',
  authorizeRegionNotSupportedText1: 'Your $1 account can\'t be connected to your Brave Rewards profile at this time. Your $1 account is registered in a country that\'s not currently supported for connecting to Brave Rewards.',
  authorizeRegionNotSupportedText2: 'See the $2current list of supported regions and learn more$3 about connecting a custodial account to Brave Rewards.',
  authorizeRegionNotSupportedTitle: 'Region currently not supported',
  authorizeSignatureVerificationErrorText: 'There was a problem validating your request to connect your $1 account to Brave Rewards. You can $2contact support$3 for more help.',
  authorizeSignatureVerificationErrorTitle: 'Request could not be validated',
  authorizeUnexpectedErrorText: 'We weren’t able to complete your request. Please try again, and $2contact support$3 if the problem persists.',
  authorizeUnexpectedErrorTitle: 'Something went wrong',
  authorizeUpholdBatNotAllowedText: 'BAT is not yet supported in your region on Uphold.',
  authorizeUpholdBatNotAllowedTitle: 'BAT unavailable',
  authorizeUpholdInsufficientCapabilitiesText: 'According to Uphold, there are currently some limitations on your Uphold account. Please log in to your Uphold account and check whether there are any notices or remaining account requirements to complete, then try again. For example, you may need to submit more information to Uphold.',
  authorizeUpholdInsufficientCapabilitiesTitle: 'Limited Uphold account functionality',
  benefitsStoreSubtext: 'Get Brave-branded products.',
  benefitsStoreText: 'Brave merch store',
  benefitsTitle: 'Your benefits',
  cancelButtonLabel: 'Cancel',
  closeButtonLabel: 'Close',
  connectAccountSubtext: 'Connect a payout account',
  connectAccountText: 'Ready to start earning?',
  connectButtonLabel: 'Connect account',
  connectCustodialTitle: 'Custodial accounts (requires ID verification)',
  connectCustodialTooltip: 'Custodial accounts are accounts with trusted third-party services that hold your BAT for you.',
  connectLoginText: 'Log in or sign up',
  connectProviderNotAvailable: 'Currently not available in your region',
  connectRegionsLearnMoreText: 'Learn more about regions and support',
  connectSelfCustodyError: 'Something went wrong. Please try again',
  connectSelfCustodyNote: 'With self-custody, BAT earnings will be paid out as SPL-BAT on the Solana network.',
  connectSelfCustodyTerms: '$1Terms of Use$2 and $3Privacy Policy$4',
  connectSelfCustodyTitle: 'Self-custody',
  connectSelfCustodyTooltip: 'Self-custody gives you exclusive control over your BAT, along with complete responsibility for its security.',
  connectSolanaButtonLabel: 'Brave Wallet',
  connectSolanaMessage: 'Or other wallet that supports Solana',
  connectText: 'To begin earning Basic Attention Token (BAT) rewards, connect an account. BAT you earn will be automatically transferred to your account every month.',
  connectTitle: 'Choose where you\'d like to receive BAT',
  continueButtonLabel: 'Continue',
  contributeButtonLabel: 'Contribute',
  countrySelectPlaceholder: 'Select',
  countrySelectTitle: 'Select your region',
  countrySelectText: 'Select your region so we can show you the right options and ads for your region.',
  doneButtonLabel: 'Done',
  earningsAdsReceivedText: '$1 ads received this month',
  earningsEstimateText: 'You\'ve earned $1 so far this month',
  earningsRangeTooltip: 'You\'re estimated to earn between: $1',
  helpButtonLabel: 'Help',
  learnMoreLink: 'Learn more',
  moreButtonLabel: 'More',
  navigationCreatorsLabel: 'Creators',
  navigationExploreLabel: 'Explore',
  navigationHomeLabel: 'Home',
  newBadgeText: 'NEW',
  onboardingButtonLabel: 'Start using Brave Rewards',
  onboardingErrorCountryDeclaredText: 'Unfortunately, there was an error while trying to set your country. Please try again.',
  onboardingErrorDisabledText: 'New signups for Brave Rewards are currently disabled in your region. However, you can always try again later. $1Learn more$2',
  onboardingErrorDisabledTitle: 'Brave Rewards not available',
  onboardingErrorText: 'Unfortunately, there was an error while trying to set up Brave Rewards. Please try again.',
  onboardingErrorTitle: 'Something went wrong',
  onboardingLearnMoreLabel: 'How does it work?',
  onboardingSuccessLearnMoreLabel: 'How does Brave Rewards work?',
  onboardingSuccessText: 'Now you can get rewarded for viewing ads. You’re helping make the web a better place for everyone. And that’s awesome!',
  onboardingSuccessTitle: 'Woohoo! You\'re all set!',
  onboardingTermsText: 'By enabling Rewards, you agree to the $1Terms of Service$2 and $3Privacy Policy$4.',
  onboardingTextItem1: 'Get paid for private ads you see in Brave',
  onboardingTextItem2: 'Get special benefits and discounts',
  onboardingTitle: 'Turn on Brave Rewards',
  payoutAccountBalanceLabel: 'Your balance',
  payoutAccountConnectedLabel: 'Connected',
  payoutAccountDetailsTitle: '$1 wallet',
  payoutAccountLabel: 'Payout account',
  payoutAccountLink: 'Go to my account',
  payoutAccountLoggedOutTitle: 'Logged Out',
  payoutAccountLoginButtonLabel: 'Log in to $1',
  payoutAccountLoginText: 'Log in to $1 to see your balance',
  payoutAccountTitle: 'Payout Account',
  payoutAccountTooltip: 'Your BAT earnings will be paid to this payout account.',
  recurringListEmptyText: 'You don\'t have any recurring contributions set up yet.',
  recurringNextContributionLabel: 'Next contribution:',
  recurringTitle: 'Recurring Contributions',
  removeButtonLabel: 'Remove',
  resetButtonLabel: 'Reset',
  resetConsentText: 'I understand that my current Brave Rewards profile and Brave Rewards data will be deleted from my device, and I\'ve read the $1support article about resetting$2.',
  resetRewardsText: 'By resetting, your current Brave Rewards profile will be deleted, and Brave Rewards will no longer be enabled. If you enable Brave Rewards again later, you will start with a new profile. Read our $1support article about resetting$2 for more details.',
  resetRewardsTitle: 'Reset Brave Rewards',
  rewardsPageTitle: 'Rewards',
  showAllButtonLabel: 'Show all',
  unconnectedAdsViewedText: 'You\'ve seen $1# Ads$2 this month'
}

export type StringKey = keyof typeof localeStrings

export function useLocaleContext() {
  return React.useContext<Locale<StringKey>>(LocaleContext)
}

export function usePluralString(key: StringKey, count: number | undefined) {
  const { getPluralString } = useLocaleContext()
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    if (typeof count !== 'number') {
      setValue('')
      return
    }
    let canUpdate = true
    getPluralString(key, count).then((newValue) => {
      if (canUpdate) {
        setValue(newValue)
      }
    })
    return () => { canUpdate = false }
  }, [getPluralString, count])

  return value
}