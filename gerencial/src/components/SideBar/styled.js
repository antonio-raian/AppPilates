import styled from "styled-components";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { darken, rgba } from "polished";

import PerfectScrollbar from "react-perfect-scrollbar";
import "../../utils/perfect-scrollbar.css";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

export const StyBox = styled(Box)(spacing);

export const StyDrawer = styled(Drawer)`
  border-right: 0;
  > div {
    border-right: 0;
  }
`;

export const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

export const StyList = styled(List)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

export const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
`;

export const BoxTop = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  max-height: 70px;
  padding-left: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

export const Item = styled(ListItem)`
  padding-top: ${(props) => props.theme.spacing(3)}px;
  padding-bottom: ${(props) => props.theme.spacing(3)}px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(5)}px;
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};

  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.05, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

export const ItemText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) => props.theme.sidebar.color};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    font-weight: ${(props) => props.theme.typography.fontWeightRegular};
    padding: 0 ${(props) => props.theme.spacing(4)}px;
  }
`;

export const ItemIconLess = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

export const ItemIconMore = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

// const Link = styled(ListItem)`
//   padding-left: ${(props) => props.theme.spacing(14)}px;
//   padding-top: ${(props) => props.theme.spacing(2)}px;
//   padding-bottom: ${(props) => props.theme.spacing(2)}px;

//   span {
//     color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
//   }

//   &:hover span {
//     color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
//   }

//   &.${(props) => props.activeClassName} {
//     background-color: ${(props) =>
//       darken(0.06, props.theme.sidebar.background)};

//     span {
//       color: ${(props) => props.theme.sidebar.color};
//     }
//   }
// `;

// const LinkText = styled(ListItemText)`
//   color: ${(props) => props.theme.sidebar.color};
//   span {
//     font-size: ${(props) => props.theme.typography.body1.fontSize}px;
//   }
//   margin-top: 0;
//   margin-bottom: 0;
// `;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

export const ItemBadge = styled(LinkBadge)`
  top: 12px;
`;

export const SidebarSection = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  padding: ${(props) => props.theme.spacing(2)}px
    ${(props) => props.theme.spacing(6)}px
    ${(props) => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

export const SidebarFooter = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(3)}px
    ${(props) => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

export const SidebarFooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

export const Dot = styled.span`
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-color: ${(props) => props.theme.sidebar.footer.online.background};
  display: inline-block;
  border-radius: 50%;
  margin-bottom: -0.5px;
`;
