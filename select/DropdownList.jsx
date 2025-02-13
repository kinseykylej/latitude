/**
 * TEAM: frontend_infra
 * @flow strict
 */

/* eslint-disable flexport/no-unused-aphrodite-styles */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {entries} from "lodash";

import DropdownOption from "./DropdownOption";
import latitudeColors from "../colors";
import invariant from "../tools/invariant";

export type Option = {|
  /** the unique label associated with the option. */
  +label: string,
  /** can be used to render a custom view */
  +customView?: React.Node,
  /** name of the section the option should go under */
  +section?: string,
  /** whether the option is disabled */
  +disabled?: boolean,
|};

type Props = {|
  /** a list of options for the dropdown list to display */
  +options: $ReadOnlyArray<Option>,
  /** the list to dicate the order sections should be ordered */
  +sectionOrder?: $ReadOnlyArray<string>,
  /** specify an optional label to highlight */
  +highlightedOption?: string | null,
  /** called when a dropdown option is clicked */
  +onClick: (selected: string) => void,
  /** whether the dropdownlist is open. a closed dropdownlist will be hidden */
  +isOpen?: boolean,
  /** an optional sticky header */
  +header?: React.Node,
  /** an optional sticky footer */
  +footer?: React.Node,
  /** specifies the maximum height of the dropdown list */
  +maxHeight?: number,
|};

/**
 * @category Data Entry
 * @short The menu that displays options in a dropdown / select
 * @brandStatus V2
 * @status In Review
 */
export default function DropdownList({
  options,
  onClick,
  sectionOrder,
  highlightedOption,
  isOpen = true,
  header,
  footer,
  maxHeight = 400,
}: Props) {
  const dropdownOptions = options.map(option => ({
    ...option,
  }));

  const renderSectionContent = (sectionOptions: typeof dropdownOptions) => (
    <ul role="listbox" className={css(styles.list)}>
      {sectionOptions.map(option => (
        <DropdownOption
          key={option.label}
          label={option.label}
          customView={option.customView}
          isHighlighted={option.label === highlightedOption}
          onClick={option.disabled ? () => {} : onClick}
          disabled={option.disabled}
        />
      ))}
    </ul>
  );

  let content = null;

  if (!sectionOrder) {
    content = renderSectionContent(dropdownOptions);
  } else {
    const sections = sectionOrder.reduce((acc, sectionName) => {
      acc[sectionName] = [];
      return acc;
    }, {});

    dropdownOptions.forEach(option => {
      invariant(
        option.section,
        "each option must have a section when sectionOrder is included"
      );
      sections[option.section].push(option);
    });

    content = entries(sections).map(([sectionName, section], i) => (
      <div key={sectionName}>
        <div
          className={css(
            styles.sectionHeader,
            i === 0 && styles.firstSectionHeader
          )}
        >
          {sectionName}
        </div>
        {renderSectionContent(section)}
      </div>
    ));
  }

  const isListEmpty =
    dropdownOptions.length === 0 && header == null && footer == null;

  return (
    <div
      className={css(
        styles.dropdown,
        !isOpen || isListEmpty ? styles.hidden : null
      )}
    >
      {header}
      <div style={{maxHeight: `${maxHeight}px`, overflowY: "auto"}}>
        {content}
      </div>
      {footer}
    </div>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    boxShadow: "0px 0px 20px rgba(57, 65, 77, 0.15)",
    background: latitudeColors.white,
    padding: "0",
  },
  firstSectionHeader: {
    borderTop: "none",
  },
  sectionHeader: {
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    padding: "12px 12px 4px 12px",
    lineHeight: "20px",
    fontSize: "14px",
    fontWeight: 700,
    color: latitudeColors.black,
    borderTop: `1px solid ${latitudeColors.grey30}`,
  },
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  hidden: {
    display: "none",
  },
});
