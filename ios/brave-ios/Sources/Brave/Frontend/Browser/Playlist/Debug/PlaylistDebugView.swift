// Copyright 2024 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import BraveShared
import Data
import Playlist
import Preferences
import SwiftUI

struct PlaylistDebugView: View {
  @State
  private var value = 0.0

  @State
  private var danglingAmount = 0.0

  @State
  private var isGenerating = false

  @State
  private var isDeletingItems = false

  @State
  private var isDeletingCaches = false

  private var formatter: NumberFormatter {
    return NumberFormatter().then {
      $0.numberStyle = .decimal
    }
  }

  var body: some View {
    VStack {
      Text("Videos to Generate:")

      HStack {
        Text("\(formatter.string(from: NSNumber(value: value)) ?? "0")")
        Spacer()
        Text("10,000")
      }

      Slider(value: $value, in: 0.0...10000.0, step: 1) { _ in
        danglingAmount = 0.0
      }
      .padding(.bottom, 20.0)

      if value > 0 {
        Text("Dangling Amount:")

        HStack {
          Text("\(formatter.string(from: NSNumber(value: danglingAmount)) ?? "0")")
          Spacer()
          Text("\(formatter.string(from: NSNumber(value: value)) ?? "0")")
        }

        Slider(value: $danglingAmount, in: 0.0...Double(value), step: 1)
      }

      Grid {
        GridRow {
          Button {
            Task {
              if let directory = await PlaylistDownloadManager.playlistDirectory {
                isGenerating = true

                Task.delayed(bySeconds: 1.0) { @MainActor in
                  DataController.performOnMainContext(save: true) { context in
                    let folder = PlaylistFolder.getFolder(
                      uuid: PlaylistFolder.savedFolderUUID,
                      context: context
                    )

                    for i in 0..<Int(value) {
                      let item = "Test-\(i).mp4"
                      let itemPath = directory.appending(path: item)
                      let cacheData =
                        Int(value) - Int(danglingAmount) - i > 0
                        ? try? itemPath.bookmarkData() : nil

                      Task {
                        await AsyncFileManager.default.createFile(
                          atPath: itemPath.path,
                          contents: Data(base64Encoded: mp4File)
                        )
                      }

                      let playlistItem = PlaylistItem(
                        context: context,
                        name: "Test-\(i)",
                        pageTitle: "Youtube - Brave: The Privacy Browser",
                        pageSrc: "https://youtu.be/fiXaHv_9rmQ",
                        cachedData: cacheData ?? Data(),
                        duration: 0,
                        mimeType: "video/mp4",
                        mediaSrc: "https://youtu.be/fiXaHv_9rmQ"
                      )

                      playlistItem.order = 0
                      playlistItem.uuid = UUID().uuidString
                      playlistItem.playlistFolder = folder
                    }

                    try? context.save()

                    isGenerating = false
                  }
                }
              }
            }
          } label: {
            Text("Generate")
              .foregroundStyle(isGenerating ? Color.clear : Color.white)
              .padding()
              .background(
                ContainerRelativeShape()
                  .fill(Color(braveSystemName: isGenerating ? .buttonDisabled : .primary70))
                  .shadow(color: Color.black.opacity(0.25), radius: 8.0, x: 0.0, y: 1.0)
              )
              .containerShape(RoundedRectangle(cornerRadius: 8.0, style: .continuous))
              .overlay {
                if isGenerating {
                  ProgressView()
                    .progressViewStyle(.circular)
                    .tint(Color(braveSystemName: .primary70))
                    .padding()
                }
              }
          }
          .disabled(value == 0)

          Button {
            Preferences.Playlist.lastCacheDataCleanupDate.value = nil
          } label: {
            Text("Reset 7 Days")
              .foregroundStyle(Color.white)
              .padding()
              .background(
                ContainerRelativeShape()
                  .fill(Color(braveSystemName: .primary70))
                  .shadow(color: Color.black.opacity(0.25), radius: 8.0, x: 0.0, y: 1.0)
              )
              .containerShape(RoundedRectangle(cornerRadius: 8.0, style: .continuous))
          }

          Button {
            isDeletingItems = true
            Task.delayed(bySeconds: 1.0) { @MainActor in
              await PlaylistManager.shared.deleteAllItems(cacheOnly: false)
              isDeletingItems = false
            }
          } label: {
            Text("Delete Items")
              .foregroundStyle(isDeletingItems ? Color.clear : Color.white)
              .padding()
              .background(
                ContainerRelativeShape()
                  .fill(Color(braveSystemName: isDeletingItems ? .buttonDisabled : .primary70))
                  .shadow(color: Color.black.opacity(0.25), radius: 8.0, x: 0.0, y: 1.0)
              )
              .containerShape(RoundedRectangle(cornerRadius: 8.0, style: .continuous))
              .overlay {
                if isDeletingItems {
                  ProgressView()
                    .progressViewStyle(.circular)
                    .tint(Color(braveSystemName: .primary70))
                    .padding()
                }
              }
          }

          Button {
            isDeletingCaches = true
            Task.delayed(bySeconds: 1.0) { @MainActor in
              await PlaylistManager.shared.deleteAllItems(cacheOnly: true)
              isDeletingCaches = false
            }
          } label: {
            Text("Delete Caches")
              .foregroundStyle(isDeletingCaches ? Color.clear : Color.white)
              .padding()
              .background(
                ContainerRelativeShape()
                  .fill(Color(braveSystemName: isDeletingCaches ? .buttonDisabled : .primary70))
                  .shadow(color: Color.black.opacity(0.25), radius: 8.0, x: 0.0, y: 1.0)
              )
              .containerShape(RoundedRectangle(cornerRadius: 8.0, style: .continuous))
              .overlay {
                if isDeletingCaches {
                  ProgressView()
                    .progressViewStyle(.circular)
                    .tint(Color(braveSystemName: .primary70))
                    .padding()
                }
              }
          }
        }
      }
      .disabled(isGenerating || isDeletingItems || isDeletingCaches)
    }
    .padding()
  }

  private let mp4File = """
    """.trimmingCharacters(in: .whitespacesAndNewlines)
}

#Preview {
  PlaylistDebugView()
}