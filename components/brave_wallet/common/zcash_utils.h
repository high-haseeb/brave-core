/* Copyright (c) 2023 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_BRAVE_WALLET_COMMON_ZCASH_UTILS_H_
#define BRAVE_COMPONENTS_BRAVE_WALLET_COMMON_ZCASH_UTILS_H_

#include <limits>
#include <optional>
#include <string>
#include <utility>
#include <vector>

#include "base/containers/span.h"
#include "brave/components/brave_wallet/common/brave_wallet.mojom.h"

namespace brave_wallet {

inline constexpr size_t kZCashDigestSize = 32;
inline constexpr size_t kOrchardRawBytesSize = 43;
inline constexpr size_t kOrchardFullViewKeySize = 96;
inline constexpr uint32_t kZip32Purpose = 32u;
inline constexpr uint32_t kTestnetCoinType = 1u;
inline constexpr uint32_t kDefaultZCashBlockHeightDelta = 20;
inline constexpr uint32_t kDefaultTransparentOutputsCount = 2;
inline constexpr uint32_t kGraceActionsCount = 2;
inline constexpr uint64_t kMarginalFee = 5000;
// Parts of compact orchard compact action
// https://github.com/zcash/lightwalletd/blob/6e3816b5834583c492c37ce05b0faaf9fe12c87f/walletrpc/compact_formats.proto#L75
inline constexpr size_t kOrchardNullifierSize = 32u;
inline constexpr size_t kOrchardCmxSize = 32u;
inline constexpr size_t kOrchardEphemeralKeySize = 32u;
inline constexpr size_t kOrchardCipherTextSize = 52u;
inline constexpr size_t kOrchardMemoSize = 512u;
inline constexpr uint64_t kZCashFullAmount =
    std::numeric_limits<uint64_t>::max();

using OrchardFullViewKey = std::array<uint8_t, kOrchardFullViewKeySize>;
using OrchardMemo = std::array<uint8_t, kOrchardMemoSize>;
using OrchardAddrRawPart = std::array<uint8_t, kOrchardRawBytesSize>;

// Reduce current scanning position on this value if reorg is found
// All Zcash network participants basically assume rollbacks longer than 100
// blocks will not occur.
inline constexpr size_t kChainReorgBlockDelta = 150;
// Number of blocks downloaded by a single request.
inline constexpr size_t kScanBatchSize = 10;

// https://zips.z.cash/zip-0316#encoding-of-unified-addresses
enum ZCashAddrType {
  kP2PKH = 0x00,
  kP2PSH = 0x01,
  kSapling = 0x02,
  kOrchard = 0x03,
  kMaxValue = kOrchard
};

enum class OrchardAddressKind {
  // External kind, can be used in account addresses.
  External,
  // Internal "change" address.
  Internal
};

using ParsedAddress = std::pair<ZCashAddrType, std::vector<uint8_t>>;

struct DecodedZCashAddress {
  DecodedZCashAddress();
  ~DecodedZCashAddress();
  DecodedZCashAddress(const DecodedZCashAddress& other);
  DecodedZCashAddress& operator=(const DecodedZCashAddress& other);
  DecodedZCashAddress(DecodedZCashAddress&& other);
  DecodedZCashAddress& operator=(DecodedZCashAddress&& other);

  std::vector<uint8_t> pubkey_hash;
  bool testnet = false;
};

struct OrchardOutput {
  uint32_t value = 0;
  OrchardAddrRawPart addr;
  std::optional<OrchardMemo> memo;

  bool operator==(const OrchardOutput& other) const = default;

  base::Value::Dict ToValue() const;
  static std::optional<OrchardOutput> FromValue(const base::Value::Dict& value);
};

// Structure describes note nullifier that marks some note as spent
struct OrchardNullifier {
  // Block id where spent nullifier was met
  uint32_t block_id = 0;
  std::array<uint8_t, kOrchardNullifierSize> nullifier;

  bool operator==(const OrchardNullifier& other) const = default;
};

// Structure describes found spendable note
struct OrchardNote {
  uint32_t block_id = 0;
  std::array<uint8_t, kOrchardNullifierSize> nullifier;
  uint32_t amount = 0;

  bool operator==(const OrchardNote& other) const = default;
};

bool OutputZCashAddressSupported(const std::string& address, bool is_testnet);
// https://zips.z.cash/zip-0317
uint64_t CalculateZCashTxFee(const uint32_t tx_input_count,
                             const uint32_t orchard_actions_count);
bool IsUnifiedAddress(const std::string& address);
bool IsUnifiedTestnetAddress(const std::string& address);

std::string PubkeyToTransparentAddress(base::span<const uint8_t> pubkey,
                                       bool testnet);

std::optional<std::string> PubkeyHashToTransparentAddress(
    base::span<const uint8_t> pubkey_hash,
    bool is_testnet);

std::optional<DecodedZCashAddress> DecodeZCashAddress(
    const std::string& address);

std::vector<uint8_t> ZCashAddressToScriptPubkey(const std::string& address,
                                                bool testnet);

std::optional<std::string> GetMergedUnifiedAddress(
    const std::vector<ParsedAddress>& parts,
    bool is_testnet);

std::optional<std::string> GetOrchardUnifiedAddress(
    base::span<const uint8_t> orchard_part,
    bool is_testnet);

std::optional<OrchardAddrRawPart> GetOrchardRawBytes(
    const std::string& unified_address,
    bool is_testnet);

std::optional<std::vector<uint8_t>> GetTransparentRawBytes(
    const std::string& unified_address,
    bool is_testnet);

std::optional<std::vector<ParsedAddress>> ExtractParsedAddresses(
    const std::string& unified_address,
    bool is_testnet);

std::optional<std::string> ExtractTransparentPart(
    const std::string& unified_address,
    bool is_testnet);

std::optional<std::string> ExtractOrchardPart(
    const std::string& unified_address,
    bool is_testnet);

std::optional<OrchardMemo> ToOrchardMemo(
    const std::optional<std::vector<uint8_t>>& input);

std::optional<std::vector<uint8_t>> OrchardMemoToVec(
    const std::optional<OrchardMemo>& memo);

// Converts 000000000049900203ce1cba81a36d29390ea40fc78cf4799e8139b96f3a8114 to
// 0x14813a6fb939819e79f48cc70fa40e39296da381ba1cce030290490000000000
std::optional<std::string> RevertHex(const std::string& hex);

}  // namespace brave_wallet

#endif  // BRAVE_COMPONENTS_BRAVE_WALLET_COMMON_ZCASH_UTILS_H_