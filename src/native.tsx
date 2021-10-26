export {
  match,
  matchPath,
  MemoryRouter,
  Prompt,
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Router,
  RouterChildContext,
  StaticRouter,
  Switch,
  withRouter,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import * as React from "react";
import * as H from "history";

export interface BackButtonProps {
  children?: React.ReactNode | undefined;
}

export class BackButton extends React.Component<BackButtonProps> {}
export class AndroidBackButton extends React.Component<BackButtonProps> {}

export class DeepLinking extends React.Component {}

export interface LinkProps {
  component?: React.ComponentType<any> | undefined;
  replace?: boolean | undefined;
  style?: any;
  to: H.LocationDescriptor;
  [propName: string]: any;
}

export class Link extends React.Component<LinkProps> {}

export interface NativeRouterProps {
  children?: React.ReactNode;
  getUserConfirmation?: Function | undefined;
  keyLength?: number | undefined;
  initialEntries?: string[] | undefined;
  initialIndex?: number | undefined;
}

export class NativeRouter extends React.Component<NativeRouterProps> {}
