/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import TimeInput, {getTimeIntervals} from "../TimeInput";
import {type WallTime, ZERO_OCLOCK, EOD_OCLOCK} from "../wallTime";
import {
  type DemoFile,
  bool,
  textAlignKnob,
  demoCommonStyles,
  disabledKnob,
  isInvalidKnob,
  textInputSizeKnob,
} from "../../design_system/types/demoTypes";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <TimeInputShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        militaryTime: bool(false),
        textAlign: textAlignKnob,
        disabled: disabledKnob,
        isInvalid: isInvalidKnob,
        size: textInputSizeKnob,
      },
      defaultProps: TimeInput.defaultProps,
    },
  ],
};

export class TimeInputShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void},
  {value: WallTime | null}
> {
  state = {
    value: null,
  };

  handleChange = (value: WallTime | null) => {
    this.setState({value});
  };

  render() {
    // TODO(dmnd): Re-suppress once Flow v110 is out.
    // FlowFixMe(uforic) get default props typing correctly
    const {elementToCodeFn, demoProps} = (this.props: any);
    const element = (
      <TimeInput
        options={getTimeIntervals(ZERO_OCLOCK, EOD_OCLOCK, 30)}
        value={this.state.value}
        onChange={this.handleChange}
        {...demoProps}
      />
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(demoCommonStyles.smallWrapper)}>{element}</div>;
  }
}

export default demos;
