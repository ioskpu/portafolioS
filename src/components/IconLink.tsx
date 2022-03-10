import React, { ReactElement } from "react";
import { IconButton, useColorModeValue, Link, IconButtonProps } from "@chakra-ui/react";

export const IconLink = ({ to = "#", icon, label, btnProps, bgHover = "blue.500" }:
{ label: string; icon: ReactElement; to?: string; btnProps?: Partial<IconButtonProps>; bgHover?: string }) => <Link href={to} target={"_blank"}>
  <IconButton
    {...btnProps}
    aria-label={label}
    variant="ghost"
    size="lg"
    icon={icon}
    _hover={{
      bg: bgHover,
      color: useColorModeValue("white", "gray.700"),
    }}
    isRound
  />
</Link>;