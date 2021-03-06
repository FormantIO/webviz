// @flow
//
//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import { storiesOf } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { withScreenshot } from "storybook-chrome-screenshot";

import AutoSizingCanvas from ".";

function Example({
  changeSize,
  changePixelRatio,
  devicePixelRatio,
}: {
  changeSize?: boolean,
  changePixelRatio?: boolean,
  devicePixelRatio?: number,
}) {
  const [width, setWidth] = useState(300);
  const [pixelRatio, setPixelRatio] = useState(devicePixelRatio);
  useEffect(
    () => {
      setTimeout(() => {
        if (changeSize) {
          setWidth(150);
        }
        if (changePixelRatio) {
          setPixelRatio(2);
        }
      }, 10);
    },
    [changePixelRatio, changeSize]
  );

  return (
    <div style={{ width, height: 100, backgroundColor: "green" }}>
      <AutoSizingCanvas
        overrideDevicePixelRatioForTest={pixelRatio}
        draw={(ctx, width, height) => {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, width, height);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.font = "24px Arial";
          ctx.strokeRect(0, 0, width, height);

          // $FlowFixMe
          const text = `hello ${ctx.getTransform().a}`;
          const size = ctx.measureText(text);
          ctx.fillStyle = "black";
          ctx.textBaseline = "middle";
          ctx.fillText(text, width / 2 - size.width / 2, height / 2);
        }}
      />
    </div>
  );
}

storiesOf("<AutoSizingCanvas>", module)
  .addDecorator(withScreenshot())
  .add("static", () => <Example />)
  .add("changing size", () => <Example changeSize />)
  .add("pixel ratio 2", () => <Example devicePixelRatio={2} />)
  .add("changing pixel ratio", () => <Example changePixelRatio />);
