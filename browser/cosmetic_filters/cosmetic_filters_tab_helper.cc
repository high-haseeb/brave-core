// Copyright (c) 2024 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

#include "brave/browser/cosmetic_filters/cosmetic_filters_tab_helper.h"

#include <utility>

#include "base/strings/string_util.h"
#include "brave/browser/brave_browser_process.h"
#include "brave/components/brave_shields/content/browser/ad_block_service.h"
#include "content/public/browser/web_contents.h"
#include "third_party/blink/public/common/associated_interfaces/associated_interface_provider.h"

#if !BUILDFLAG(IS_ANDROID)
#include "brave/browser/ui/brave_pages.h"
#include "chrome/browser/ui/browser_finder.h"
#endif  // !BUILDFLAG(IS_ANDROID)

namespace cosmetic_filters {

namespace {
std::string SanitizeSelector(const std::string selector) {
  if (!base::IsStringUTF8(selector)) {
    return {};
  }

  // The rules are parsed by adblock-rust via lines() method.
  // The method checks a newline byte (the 0xA byte) or CRLF (0xD, 0xA bytes).
  // https://doc.rust-lang.org/stable/std/io/trait.BufRead.html#method.lines
  if (base::Contains(selector, '\n')) {
    return {};
  }

  return selector;
}
}  // namespace

// static
void CosmeticFiltersTabHelper::LaunchContentPicker(
    content::WebContents* web_contents) {
  CosmeticFiltersTabHelper::CreateForWebContents(web_contents);
  if (auto* main_rfh = web_contents->GetPrimaryMainFrame()) {
    mojo::AssociatedRemote<mojom::CosmeticFiltersAgent> cosmetic_filter_agent;
    main_rfh->GetRemoteAssociatedInterfaces()->GetInterface(
        &cosmetic_filter_agent);
    cosmetic_filter_agent->LaunchContentPicker();
  }
}

// static
void CosmeticFiltersTabHelper::BindCosmeticFiltersHandler(
    content::RenderFrameHost* rfh,
    mojo::PendingAssociatedReceiver<mojom::CosmeticFiltersHandler> receiver) {
  auto* web_contents = content::WebContents::FromRenderFrameHost(rfh);
  if (!web_contents) {
    return;
  }
  CosmeticFiltersTabHelper::CreateForWebContents(web_contents);
  if (auto* tab_helper =
          CosmeticFiltersTabHelper::FromWebContents(web_contents)) {
    tab_helper->receivers_.Bind(rfh, std::move(receiver));
  }
}

void CosmeticFiltersTabHelper::AddSiteCosmeticFilter(
    const std::string& filter) {
  // `filter` doesn't have a host, because we don't trust a renderer process.
  // Instead, we calculate and add the host explicitly here.
  const auto* sender_rfh = receivers_.GetCurrentTargetFrame();
  CHECK(sender_rfh);
  const std::string sanitized_filter = SanitizeSelector(filter);
  if (!sanitized_filter.empty()) {
    const auto host = sender_rfh->GetLastCommittedOrigin().host();
    g_brave_browser_process->ad_block_service()->AddUserCosmeticFilter(
        host + "##" + sanitized_filter);
  }
}

void CosmeticFiltersTabHelper::ManageCustomFilters() {
#if !BUILDFLAG(IS_ANDROID)
  Browser* browser = chrome::FindLastActive();
  if (browser) {
    brave::ShowBraveAdblock(browser);
  }
#else   // !BUILDFLAG(IS_ANDROID)
  NOTIMPLEMENTED();
#endif  // !BUILDFLAG(IS_ANDROID)
}

CosmeticFiltersTabHelper::CosmeticFiltersTabHelper(
    content::WebContents* web_contents)
    : content::WebContentsUserData<CosmeticFiltersTabHelper>(*web_contents),
      receivers_(web_contents, this) {}

CosmeticFiltersTabHelper::~CosmeticFiltersTabHelper() = default;

WEB_CONTENTS_USER_DATA_KEY_IMPL(CosmeticFiltersTabHelper);
}  // namespace cosmetic_filters