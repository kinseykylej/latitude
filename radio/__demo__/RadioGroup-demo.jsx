/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {type DemoFile, bool} from "../../design_system/types/demoTypes";
import RadioGroup from "../RadioGroup";
import {characters} from "../../tools/demo";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <RadioGroupShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        disabled: bool(false),
        isCompact: bool(false),
        isInline: bool(true),
        isInvalid: bool(false),
      },
    },
  ],
};

export class RadioGroupShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void},
  {value: string | null}
> {
  state = {
    value: null,
  };

  handleChange = (value: string) => {
    this.setState({value});
  };

  render() {
    // TODO(dmnd): Re-suppress once Flow v110 is out.
    // FlowFixMe(uforic) get default props typing correctly
    const {elementToCodeFn, demoProps} = (this.props: any);
    const options = characters.map(character => ({
      label: character.name,
      value: character.name,
    }));
    const element = (
      <RadioGroup
        options={options}
        value={this.state.value}
        onChange={this.handleChange}
        {...demoProps}
      />
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return element;
  }
}

export default demos;
