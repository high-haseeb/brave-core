// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'

const SvgComponent = (props: any) => (
  <svg
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#safari-a)">
      <g opacity={0.53} filter="url(#safari-b)">
        <path
          d="M222.962 135.305a88.9 88.9 0 0 1-7.261 35.15c-4.794 11.143-11.82 21.269-20.677 29.798s-19.372 15.295-30.945 19.91a98.576 98.576 0 0 1-36.502 6.992 98.577 98.577 0 0 1-36.502-6.992c-11.573-4.615-22.088-11.381-30.945-19.91-8.858-8.529-15.884-18.655-20.677-29.798a88.908 88.908 0 0 1-7.26-35.15c0-24.36 10.049-47.722 27.937-64.948 17.888-17.225 42.149-26.902 67.447-26.902a98.577 98.577 0 0 1 36.502 6.992c11.573 4.616 22.088 11.381 30.945 19.91 8.857 8.53 15.883 18.655 20.677 29.799a88.89 88.89 0 0 1 7.261 35.149Z"
          fill="#000"
        />
      </g>
      <path
        d="M226.588 127.195a99.014 99.014 0 0 1-29.001 70.015 99.02 99.02 0 0 1-32.123 21.464 99.016 99.016 0 0 1-37.892 7.537 99.016 99.016 0 1 1 0-198.032 99.015 99.015 0 0 1 70.015 29 99.007 99.007 0 0 1 21.464 32.124 99.017 99.017 0 0 1 7.537 37.892v0Z"
        fill="url(#safari-c)"
        stroke="#CDCDCD"
        strokeWidth={0.351}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M218.83 127.195a91.256 91.256 0 0 1-91.258 91.257 91.255 91.255 0 1 1 0-182.514 91.258 91.258 0 0 1 91.258 91.257Z"
        fill="url(#safari-d)"
      />
      <path
        d="M127.572 40.696c-.737 0-1.33.594-1.33 1.33v15.348c0 .737.593 1.33 1.33 1.33a1.328 1.328 0 0 0 1.331-1.33V42.027a1.328 1.328 0 0 0-1.331-1.33Zm-8.704.55a1.226 1.226 0 0 0-.27.002 1.328 1.328 0 0 0-1.186 1.461l.671 6.42a1.328 1.328 0 0 0 1.461 1.186 1.328 1.328 0 0 0 1.186-1.462l-.671-6.42a1.327 1.327 0 0 0-1.191-1.186Zm17.469.007a1.328 1.328 0 0 0-1.192 1.186l-.675 6.42a1.328 1.328 0 0 0 1.184 1.462 1.327 1.327 0 0 0 1.462-1.184l.676-6.42a1.328 1.328 0 0 0-1.185-1.462 1.41 1.41 0 0 0-.27-.002Zm-26.41 1.29a1.351 1.351 0 0 0-.269.029 1.328 1.328 0 0 0-1.026 1.577l3.178 15.014a1.329 1.329 0 0 0 1.578 1.026 1.327 1.327 0 0 0 1.026-1.577l-3.178-15.014a1.328 1.328 0 0 0-1.309-1.056v.001Zm35.351.013a1.326 1.326 0 0 0-1.309 1.054l-3.19 15.012a1.328 1.328 0 0 0 1.025 1.578 1.328 1.328 0 0 0 1.578-1.025l3.19-15.012a1.328 1.328 0 0 0-1.294-1.606v-.001Zm-43.884 2.393a1.293 1.293 0 0 0-.526.062 1.327 1.327 0 0 0-.854 1.676l1.995 6.14a1.328 1.328 0 0 0 1.677.854 1.327 1.327 0 0 0 .853-1.677l-1.994-6.14a1.328 1.328 0 0 0-1.151-.915Zm52.369.003c-.517.044-.98.39-1.151.916l-1.996 6.139a1.328 1.328 0 0 0 .854 1.676 1.328 1.328 0 0 0 1.677-.854l1.996-6.14a1.328 1.328 0 0 0-.854-1.676 1.335 1.335 0 0 0-.526-.06Zm-60.808 3.085a1.328 1.328 0 0 0-.516.116 1.328 1.328 0 0 0-.675 1.756l6.233 14.024a1.327 1.327 0 0 0 1.756.675 1.329 1.329 0 0 0 .676-1.756l-6.234-14.024a1.328 1.328 0 0 0-1.24-.79v-.001Zm69.341.047a1.331 1.331 0 0 0-1.241.79l-6.252 14.015c-.3.673 0 1.457.673 1.757a1.327 1.327 0 0 0 1.757-.673l6.252-14.015a1.326 1.326 0 0 0-.673-1.757 1.337 1.337 0 0 0-.516-.117Zm-77.173 4.097a1.316 1.316 0 0 0-.758.177 1.327 1.327 0 0 0-.487 1.817l3.228 5.59a1.327 1.327 0 0 0 1.817.488 1.328 1.328 0 0 0 .487-1.818l-3.227-5.59a1.328 1.328 0 0 0-1.06-.664Zm84.898 0a1.326 1.326 0 0 0-1.059.663l-3.228 5.591a1.328 1.328 0 0 0 .488 1.818 1.327 1.327 0 0 0 1.817-.487l3.228-5.591a1.328 1.328 0 0 0-.487-1.817 1.33 1.33 0 0 0-.759-.177Zm-92.503 4.744a1.334 1.334 0 0 0-.737.254 1.327 1.327 0 0 0-.295 1.858l9.011 12.422a1.328 1.328 0 0 0 1.859.296 1.327 1.327 0 0 0 .295-1.858L78.64 57.475a1.327 1.327 0 0 0-1.122-.55Zm100.204.068a1.324 1.324 0 0 0-1.122.547l-9.029 12.41a1.327 1.327 0 0 0 .293 1.86 1.328 1.328 0 0 0 1.859-.293l9.028-12.41a1.327 1.327 0 0 0-.293-1.86 1.33 1.33 0 0 0-.736-.254ZM70.719 62.626a1.322 1.322 0 0 0-.96.341 1.327 1.327 0 0 0-.098 1.88l4.319 4.798a1.327 1.327 0 0 0 1.879.098 1.328 1.328 0 0 0 .098-1.88l-4.318-4.797a1.327 1.327 0 0 0-.92-.44Zm113.716.01a1.329 1.329 0 0 0-.919.44l-4.32 4.797a1.328 1.328 0 0 0 .099 1.88 1.326 1.326 0 0 0 1.878-.1l4.32-4.796a1.328 1.328 0 0 0-.098-1.88 1.326 1.326 0 0 0-.96-.341Zm-120.231 6.25a1.33 1.33 0 0 0-.92.439 1.327 1.327 0 0 0 .1 1.879l11.405 10.268a1.327 1.327 0 0 0 1.879-.1 1.327 1.327 0 0 0-.098-1.878L65.163 69.226a1.327 1.327 0 0 0-.96-.34Zm126.778.044a1.323 1.323 0 0 0-.96.34l-11.413 10.26a1.328 1.328 0 0 0-.101 1.879 1.329 1.329 0 0 0 1.88.1l11.413-10.26a1.327 1.327 0 0 0 .1-1.879 1.328 1.328 0 0 0-.919-.44ZM58.785 75.852a1.325 1.325 0 0 0-1.122.55 1.327 1.327 0 0 0 .294 1.857l5.223 3.795a1.327 1.327 0 0 0 1.858-.294 1.328 1.328 0 0 0-.294-1.859l-5.223-3.794a1.33 1.33 0 0 0-.736-.255Zm137.611.049a1.332 1.332 0 0 0-.737.254l-5.225 3.79a1.329 1.329 0 0 0-.295 1.86 1.327 1.327 0 0 0 1.858.294l5.225-3.79a1.328 1.328 0 0 0 .296-1.859 1.328 1.328 0 0 0-1.122-.55ZM53.722 83.284a1.324 1.324 0 0 0-1.06.663 1.327 1.327 0 0 0 .488 1.818l13.29 7.673a1.327 1.327 0 0 0 1.817-.487 1.327 1.327 0 0 0-.487-1.817L54.48 83.46a1.33 1.33 0 0 0-.758-.176Zm147.701 0a1.32 1.32 0 0 0-.759.176l-13.29 7.674a1.327 1.327 0 0 0-.487 1.817 1.327 1.327 0 0 0 1.817.487l13.291-7.673a1.327 1.327 0 0 0 .487-1.818 1.326 1.326 0 0 0-1.059-.663Zm-151.53 7.921a1.325 1.325 0 0 0-1.24.79 1.328 1.328 0 0 0 .672 1.757l5.896 2.63a1.327 1.327 0 0 0 1.758-.673 1.328 1.328 0 0 0-.674-1.758l-5.896-2.63a1.328 1.328 0 0 0-.516-.115Zm155.384.055a1.332 1.332 0 0 0-.517.116l-5.897 2.625a1.328 1.328 0 0 0-.675 1.757c.3.674 1.084.975 1.757.675l5.898-2.626a1.327 1.327 0 0 0 .674-1.757 1.327 1.327 0 0 0-1.24-.79ZM46.481 99.485a1.326 1.326 0 0 0-1.151.914 1.327 1.327 0 0 0 .853 1.677l14.591 4.755a1.328 1.328 0 0 0 1.677-.853 1.327 1.327 0 0 0-.852-1.677l-14.592-4.755a1.332 1.332 0 0 0-.526-.061Zm162.202.057a1.295 1.295 0 0 0-.526.061l-14.595 4.744a1.329 1.329 0 0 0-.854 1.677 1.328 1.328 0 0 0 1.677.854l14.595-4.744a1.328 1.328 0 0 0 .854-1.677 1.328 1.328 0 0 0-1.151-.915Zm-164.328 8.634a1.327 1.327 0 0 0-1.31 1.055 1.328 1.328 0 0 0 1.025 1.578l6.315 1.342a1.328 1.328 0 0 0 1.578-1.025 1.327 1.327 0 0 0-1.025-1.578l-6.314-1.342a1.302 1.302 0 0 0-.269-.029v-.001Zm166.437.012a1.639 1.639 0 0 0-.268.029l-6.315 1.341a1.328 1.328 0 0 0-1.025 1.578 1.328 1.328 0 0 0 1.578 1.025l6.314-1.341a1.328 1.328 0 0 0 1.026-1.578 1.329 1.329 0 0 0-1.31-1.055v.001Zm-168.046 8.73a1.327 1.327 0 0 0-1.192 1.184 1.329 1.329 0 0 0 1.183 1.464l15.261 1.613a1.327 1.327 0 0 0 1.463-1.183 1.327 1.327 0 0 0-1.183-1.463l-15.262-1.614a1.433 1.433 0 0 0-.27-.001Zm169.666.115a1.162 1.162 0 0 0-.27.001l-15.264 1.593a1.327 1.327 0 0 0-1.185 1.461 1.327 1.327 0 0 0 1.462 1.185l15.263-1.593a1.327 1.327 0 0 0 1.185-1.461 1.326 1.326 0 0 0-1.191-1.186Zm-169.924 8.833a1.328 1.328 0 0 0-1.33 1.331c0 .737.593 1.33 1.33 1.33h6.455c.737 0 1.331-.593 1.331-1.33 0-.737-.594-1.331-1.33-1.331h-6.456Zm163.713 0c-.737 0-1.33.594-1.33 1.331s.593 1.33 1.33 1.33h6.455c.738 0 1.331-.593 1.331-1.33 0-.737-.593-1.331-1.331-1.331h-6.455Zm-147.94 7.254a1.16 1.16 0 0 0-.27.001l-15.265 1.593a1.327 1.327 0 0 0-1.185 1.461 1.327 1.327 0 0 0 1.461 1.185l15.264-1.593a1.327 1.327 0 0 0 1.186-1.461 1.326 1.326 0 0 0-1.192-1.186Zm138.615.094a1.327 1.327 0 0 0-1.193 1.184 1.329 1.329 0 0 0 1.183 1.464l15.262 1.613a1.327 1.327 0 0 0 1.463-1.183 1.327 1.327 0 0 0-1.183-1.463l-15.261-1.614a1.293 1.293 0 0 0-.271-.001Zm-146.224 8.988c-.089.001-.179.01-.269.029l-6.315 1.341a1.328 1.328 0 0 0-1.025 1.578 1.328 1.328 0 0 0 1.578 1.025l6.315-1.341a1.328 1.328 0 0 0 1.025-1.578 1.328 1.328 0 0 0-1.31-1.055v.001Zm153.839.013a1.325 1.325 0 0 0-1.309 1.054 1.326 1.326 0 0 0 1.024 1.578l6.315 1.342a1.327 1.327 0 0 0 1.578-1.024 1.329 1.329 0 0 0-1.025-1.579l-6.314-1.342a1.3 1.3 0 0 0-.269-.028v-.001Zm-143.206 5.24a1.288 1.288 0 0 0-.525.061l-14.595 4.745a1.327 1.327 0 0 0-.854 1.676 1.328 1.328 0 0 0 1.677.854l14.594-4.744a1.328 1.328 0 0 0 .855-1.677 1.33 1.33 0 0 0-1.152-.915Zm132.56.047a1.33 1.33 0 0 0-1.152.914 1.329 1.329 0 0 0 .853 1.678l14.592 4.754a1.327 1.327 0 0 0 1.677-.852 1.328 1.328 0 0 0-.853-1.678l-14.591-4.754a1.327 1.327 0 0 0-.526-.062Zm-138.13 10.344a1.34 1.34 0 0 0-.515.116l-5.898 2.626a1.327 1.327 0 0 0-.674 1.756c.3.674 1.083.974 1.756.674l5.898-2.625c.673-.3.974-1.083.674-1.757a1.328 1.328 0 0 0-1.24-.79Zm143.692.051a1.325 1.325 0 0 0-1.241.789c-.3.673 0 1.457.673 1.757l5.896 2.63c.673.3 1.457 0 1.757-.673.3-.673 0-1.457-.673-1.757l-5.895-2.63a1.329 1.329 0 0 0-.517-.116ZM67.199 160.78a1.313 1.313 0 0 0-.759.177l-13.29 7.673a1.327 1.327 0 0 0-.487 1.817 1.326 1.326 0 0 0 1.817.487l13.29-7.673a1.328 1.328 0 0 0 .488-1.818 1.327 1.327 0 0 0-1.06-.663Zm120.747 0a1.325 1.325 0 0 0-1.059.663 1.327 1.327 0 0 0 .487 1.818l13.29 7.673c.639.369 1.45.152 1.818-.487a1.326 1.326 0 0 0-.487-1.817l-13.291-7.674a1.324 1.324 0 0 0-.758-.176ZM63.884 172.041a1.332 1.332 0 0 0-.737.254l-5.224 3.791a1.327 1.327 0 0 0-.296 1.858 1.327 1.327 0 0 0 1.858.296l5.225-3.791a1.327 1.327 0 0 0 .296-1.858 1.327 1.327 0 0 0-1.122-.55Zm127.345.045a1.322 1.322 0 0 0-1.122.549 1.327 1.327 0 0 0 .294 1.858l5.223 3.795a1.327 1.327 0 0 0 1.858-.295 1.328 1.328 0 0 0-.294-1.858l-5.223-3.794a1.332 1.332 0 0 0-.736-.256v.001Zm-115.512.459a1.324 1.324 0 0 0-.96.34l-11.413 10.26a1.327 1.327 0 0 0-.1 1.879 1.327 1.327 0 0 0 1.879.1l11.413-10.26c.548-.493.593-1.33.1-1.879a1.326 1.326 0 0 0-.919-.44Zm103.679.037c-.34.019-.673.166-.92.439a1.328 1.328 0 0 0 .099 1.879l11.406 10.268a1.328 1.328 0 0 0 1.879-.099 1.327 1.327 0 0 0-.098-1.878l-11.407-10.268a1.322 1.322 0 0 0-.959-.341Zm-92.851 9.747a1.326 1.326 0 0 0-1.123.547l-9.028 12.411a1.327 1.327 0 0 0 .292 1.858 1.327 1.327 0 0 0 1.86-.293l9.027-12.41a1.328 1.328 0 0 0-.293-1.859 1.322 1.322 0 0 0-.735-.254Zm81.98.055a1.34 1.34 0 0 0-.736.254 1.329 1.329 0 0 0-.296 1.858l9.012 12.422a1.327 1.327 0 0 0 1.858.296 1.328 1.328 0 0 0 .296-1.858l-9.012-12.422a1.327 1.327 0 0 0-1.122-.55Zm-93.635 1.917a1.332 1.332 0 0 0-.919.44l-4.32 4.797a1.327 1.327 0 0 0 .099 1.879 1.327 1.327 0 0 0 1.879-.099l4.32-4.797a1.328 1.328 0 0 0-.099-1.879 1.323 1.323 0 0 0-.96-.341Zm105.356.006a1.323 1.323 0 0 0-.96.341 1.328 1.328 0 0 0-.098 1.879l4.318 4.798c.493.548 1.331.592 1.879.099s.592-1.331.099-1.879l-4.319-4.798a1.329 1.329 0 0 0-.919-.44Zm-81.094 5.322a1.324 1.324 0 0 0-1.24.789l-6.253 14.015a1.327 1.327 0 0 0 .673 1.757 1.326 1.326 0 0 0 1.757-.673l6.253-14.015c.3-.673 0-1.457-.673-1.757a1.343 1.343 0 0 0-.517-.116Zm56.756.039c-.173.003-.348.04-.517.115a1.327 1.327 0 0 0-.675 1.756l6.233 14.024a1.328 1.328 0 0 0 1.757.675 1.328 1.328 0 0 0 .675-1.756l-6.233-14.024a1.33 1.33 0 0 0-1.24-.79Zm-67.743 4.294a1.326 1.326 0 0 0-1.06.664l-3.227 5.59a1.328 1.328 0 0 0 .487 1.818 1.328 1.328 0 0 0 1.817-.487l3.228-5.591a1.327 1.327 0 0 0-.487-1.817 1.337 1.337 0 0 0-.758-.177Zm78.815 0a1.317 1.317 0 0 0-.758.177 1.326 1.326 0 0 0-.487 1.817l3.227 5.591a1.33 1.33 0 0 0 1.818.487 1.329 1.329 0 0 0 .487-1.818l-3.228-5.59a1.329 1.329 0 0 0-1.059-.664Zm-53.908.201a1.325 1.325 0 0 0-1.309 1.054l-3.19 15.012a1.328 1.328 0 0 0 1.025 1.578 1.328 1.328 0 0 0 1.578-1.025l3.19-15.012a1.329 1.329 0 0 0-1.025-1.578 1.315 1.315 0 0 0-.269-.028v-.001Zm28.953.009a1.327 1.327 0 0 0-1.294 1.606l3.179 15.014a1.327 1.327 0 0 0 1.577 1.026 1.327 1.327 0 0 0 1.026-1.577l-3.179-15.014a1.326 1.326 0 0 0-1.308-1.055h-.001Zm-14.453 1.514c-.737 0-1.33.594-1.33 1.331v15.347c0 .737.593 1.33 1.33 1.33.737 0 1.331-.593 1.331-1.33v-15.347c0-.737-.594-1.331-1.331-1.331Zm-24.423 4.96c-.517.043-.98.389-1.151.915l-1.996 6.139a1.328 1.328 0 0 0 .854 1.677 1.328 1.328 0 0 0 1.677-.854l1.995-6.139a1.328 1.328 0 0 0-.853-1.677 1.326 1.326 0 0 0-.526-.061Zm48.836.003a1.327 1.327 0 0 0-1.38 1.737l1.995 6.14a1.328 1.328 0 0 0 1.677.854 1.327 1.327 0 0 0 .854-1.676l-1.995-6.14a1.327 1.327 0 0 0-1.151-.915Zm-32.764 3.419a1.328 1.328 0 0 0-1.193 1.185l-.675 6.421a1.327 1.327 0 0 0 1.184 1.462 1.328 1.328 0 0 0 1.463-1.184l.675-6.42a1.328 1.328 0 0 0-1.184-1.463 1.434 1.434 0 0 0-.27-.001Zm16.649.007a1.327 1.327 0 0 0-1.455 1.462l.67 6.421a1.329 1.329 0 0 0 1.462 1.185 1.329 1.329 0 0 0 1.185-1.462l-.67-6.42a1.328 1.328 0 0 0-1.192-1.187v.001Z"
        fill="#F4F2F3"
      />
      <g opacity={0.409} filter="url(#safari-e)">
        <path
          d="m189.93 73.975-72.794 42.293-46.025 72.457 67.331-49.871 51.488-64.879Z"
          fill="#000"
        />
      </g>
      <path
        d="m138.005 138.12-20.865-21.85 74.016-49.791-53.151 71.641Z"
        fill="#FF5150"
      />
      <path
        d="m138.005 138.12-20.865-21.85-53.151 71.641 74.016-49.791Z"
        fill="#F1F1F1"
      />
      <path
        opacity={0.243}
        d="m63.989 187.911 74.016-49.791 53.151-71.641L63.989 187.91Z"
        fill="#000"
      />
    </g>
    <defs>
      <filter
        id="safari-b"
        x={23.239}
        y={34.502}
        width={208.677}
        height={201.607}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={4.477}
          result="effect1_foregroundBlur_580_10783"
        />
      </filter>
      <filter
        id="safari-e"
        x={68.566}
        y={71.43}
        width={123.908}
        height={119.839}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={1.272}
          result="effect1_foregroundBlur_580_10783"
        />
      </filter>
      <radialGradient
        id="safari-d"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(127.984 113.888) scale(99.0158)"
      >
        <stop stopColor="#06C2E7" />
        <stop offset={0.25} stopColor="#0DB8EC" />
        <stop offset={0.5} stopColor="#12AEF1" />
        <stop offset={0.75} stopColor="#1F86F9" />
        <stop offset={1} stopColor="#107DDD" />
      </radialGradient>
      <linearGradient
        id="safari-c"
        x1={127.569}
        y1={226.209}
        x2={127.569}
        y2={28.178}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BDBDBD" />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <clipPath id="safari-a">
        <path fill="#fff" d="M23 28h209.144v208H23z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgComponent