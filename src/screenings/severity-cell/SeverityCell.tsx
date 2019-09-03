import React from "react";

import { Severity as SeverityType } from "../Screenings.types";
import { Icon, IconButton } from "../../components/icon-button/IconButton";
import { theme } from "../../theme";

interface SeverityProps {
  readonly severity: SeverityType;
  readonly onClick?: () => void;
}

const severityIcons: { [key: string]: Icon } = {
  "70-WARNING":               "warning",
  "60-OK":                    "ok",
  "80-CRITICAL_ACKNOWLEDGED": "acknowledged",
  "30-UNKNOWN":               "unknown",
  "90-CRITICAL":              "critical"
};

const severityColors: { [key: string]: keyof typeof theme.colors } = {
  "70-WARNING":               "orange",
  "60-OK":                    "green",
  "80-CRITICAL_ACKNOWLEDGED": "red",
  "30-UNKNOWN":               "blue",
  "90-CRITICAL":              "red"
};

const severityDescriptions: { [key: string]: string } = {
  "70-WARNING":               `Warning (70)`,
  "60-OK":                    `OK (60)`,
  "80-CRITICAL_ACKNOWLEDGED": `Critical Acknowledged (80)`,
  "30-UNKNOWN":               `Unknown (30)`,
  "90-CRITICAL":              `Critical (90)`
};

export const Severity = (props: SeverityProps) => (
  props.severity
    ? <IconButton
        icon={severityIcons[props.severity]}
        title={severityDescriptions[props.severity]}
        onClick={props.onClick}
        color={severityColors[props.severity]}>
        {props.severity.toString()}
      </IconButton>
    : <></>
);
