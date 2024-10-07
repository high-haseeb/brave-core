/* Copyright (c) 2024 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

#include "src/components/plus_addresses/features.cc"

#include "base/feature_override.h"
#include "build/build_config.h"

namespace plus_addresses::features {

OVERRIDE_FEATURE_DEFAULT_STATES({{
    {kPlusAddressesEnabled, base::FEATURE_DISABLED_BY_DEFAULT},
}});

}  // namespace plus_addresses::features