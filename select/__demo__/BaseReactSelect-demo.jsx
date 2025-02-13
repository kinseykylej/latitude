/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css} from "aphrodite";
import {
  type DemoFile,
  bool,
  text,
  isLargeKnob,
  demoCommonStyles,
  disabledKnob,
  isInvalidKnob,
} from "../../design_system/types/demoTypes";
import BaseReactSelect from "../BaseReactSelect";
import {type StarWarsCharacter, characters} from "../../tools/demo";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <BaseReactSelectShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        disabled: disabledKnob,
        isMenuRenderer: bool(false),
        isNullable: bool(false),
        isInvalid: isInvalidKnob,
        isLarge: isLargeKnob,
        placeholder: text("Select a character"),
      },
      defaultProps: BaseReactSelect.defaultProps,
    },
    {
      type: "code",
      title: "SelectInput is nullable",
      description:
        "Set isNullable to true to allow the user to reset the input to null",
      example: elementToCodeFn => (
        <BaseReactSelectShim
          elementToCodeFn={elementToCodeFn}
          demoProps={{isNullable: true}}
        />
      ),
    },
  ],
};

export class BaseReactSelectShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps: any},
  {value: StarWarsCharacter | null}
> {
  state = {
    value: null,
  };

  handleChange = (value: StarWarsCharacter | null) => {
    this.setState({value});
  };

  render() {
    const options = characters.map(character => ({
      option: character,
      label: character.name,
    }));
    const {elementToCodeFn, demoProps} = this.props;
    const renderer = demoProps.isMenuRenderer
      ? {
          type: "valueAndMenuRenderer",
          menuRenderer: (props: {
            +options: $ReadOnlyArray<{
              label?: string,
              value: string,
              option: StarWarsCharacter,
            }>,
          }) => {
            const {options} = props;
            return (
              <div>
                {options.map(opt => (
                  <div key={opt.option.id}>{opt.option.id}</div>
                ))}
              </div>
            );
          },
        }
      : {
          type: "valueRenderOnly",
        };
    const element = (
      <BaseReactSelect
        {...demoProps}
        value={this.state.value}
        options={options}
        onChange={this.handleChange}
        keyFn={character => character.id.toString()}
        valueRenderer={character => character.name}
        renderOptions={renderer}
      />
    );
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn && elementToCodeFn(element);
    return <div className={css(demoCommonStyles.smallWrapper)}>{element}</div>;
  }
}

export default demos;
