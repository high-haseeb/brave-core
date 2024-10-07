/* Copyright (c) 2024 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

testing.addTest(async () => {
  let { waitFor, waitForElement, waitForShadowElement } = testing

  if (!location.pathname.includes('/authorization/')) {
    let connectButton = await waitForShadowElement([
      '.connect-button',
      'button'
    ])
    connectButton.click()

    let providerButton = await waitForElement('button[data-provider=uphold]')
    providerButton.click()
    return
  }

  await waitFor('authorization complete', () => {
    return !location.pathname.includes('/authorization/')
  })
})