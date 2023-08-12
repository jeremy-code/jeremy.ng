"use client";

import { Icon as CIcon, IconProps as CIconProps } from "@chakra-ui/react";
// Icon imports
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  LinkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export const icons = {
  name: UserIcon,
  email: EnvelopeIcon,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  dark: MoonIcon,
  light: SunIcon,
  code: CodeBracketIcon,
  link: LinkIcon,
  school: AcademicCapIcon,
  work: BriefcaseIcon,
};

export type iconType = keyof typeof icons;

type IconProps = {
  name: iconType;
} & CIconProps;

export const Icon = ({ name, ...props }: IconProps) => {
  return <CIcon {...props} as={icons[name]} />;
};
