/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import getInnerExpression from "./getInnerExpression";

/*
 * calls reactElementToJSXString with an opinionated and consistent set of options
 */
function jsxToString(jsxElement: React.Node): string {
  const options = {
    displayName: element =>
      getInnerExpression(element.type.displayName || element.type),
    showDefaultProps: false,
    useBooleanShorthandSyntax: false,
    functionValue: fn => fn.name,
    filterProps: [],
    showFunctions: true,
    tabStop: 2,
    useFragmentShortSyntax: true,
    sortProps: false,
  };

  // TODO(dmnd): Re-suppress once Flow v110 is out.
  // FlowFixMe(dirak) React.Node === React.Element<any>
  return reactElementToJSXString((jsxElement: any), options);
}

export default jsxToString;
