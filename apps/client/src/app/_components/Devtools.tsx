import {
  TanStackDevtools,
  type TanStackDevtoolsReactPlugin,
} from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

const devtoolsPlugins = [
  {
    name: "TanStack Query",
    render: <ReactQueryDevtoolsPanel />,
  },
  formDevtoolsPlugin(),
] satisfies TanStackDevtoolsReactPlugin[];

const Devtools = () => {
  return <TanStackDevtools plugins={devtoolsPlugins} />;
};

export { Devtools };
