import React from "react";
import { Add, NewReleases, Error, CheckBox, EventNote, Help, ArrowDownward, ArrowUpward, Close, Search } from "@material-ui/icons";

import { Container } from "./IconButton.styles";
import { theme } from "../../theme";

export type Icon
  = "delete"
  | "add"
  | "close"
  | "up"
  | "down"
  | "search"
  | "warning"
  | "ok"
  | "acknowledged"
  | "unknown"
  | "critical";

export interface IconButtonProps {
  readonly icon: Icon;
  readonly children: string;
  readonly size?: "small" | "medium";
  readonly className?: string;
  readonly title?: string;
  readonly color?: keyof typeof theme.colors;
  readonly onClick?: () => void;
}

const iconMap = {
  "delete": Close,
  "add": Add,
  "close": Close,
  "up": ArrowUpward,
  "down": ArrowDownward,
  "search": Search,
  "warning": Error,
  "ok": CheckBox,
  "acknowledged": EventNote,
  "unknown": Help,
  "critical": NewReleases,
};

export const IconButton = (props: IconButtonProps) => {
  const MaterialIcon = iconMap[props.icon];
  return (
    <Container title={props.title || props.children} size={props.size} color={props.color}>
      <MaterialIcon
        className={`icon ${props.className}`}
        onClick={() => props.onClick && props.onClick()}
      />
      <b>{props.children}</b>
    </Container>
  );
};