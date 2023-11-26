import React, { FC, useState } from "react";
import {
  AspectRatio,
  VStack,
  Text,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { Project, Libs, SecondaryLibs, Feature, CiLibs } from "@components";
import { useThemeProvider } from "@hooks";
import { CgProfile } from "react-icons/cg";

const Work: FC = () => {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
};

const RoleCard: FC<{ role: string }> = ({ role }) => {
  const { theme } = useThemeProvider();
  return (
    <VStack
      textAlign={"center"}
      color={useColorModeValue("primary.300", "primary.500")}
    >
      <CgProfile size={35} />
      <Text fontWeight="bold">
        Rol
        <Badge colorScheme={theme}>{role}</Badge>
      </Text>
    </VStack>
  );
};

export const work = (
  isFrameLoading: boolean,
  setFrameLoading: (l: boolean) => void
): Parameters<typeof Project>[0][] => [
  {
    title: "Sabas POS",
    subTitle: "Sistema ERP",
    description:
      "Sabas POS es un ERP (por sus siglas en ingles ‘Planificación de Recursos Empresariales’) es un conjunto de aplicaciones de software integradas + POS (punto de venta)",
    devStack: [
      CiLibs.Laravel.icon,
      Libs.JavaScript.icon,
      SecondaryLibs.MySQL.icon,
      SecondaryLibs.html.icon,
      SecondaryLibs.css.icon,
      SecondaryLibs.ESLint.icon,
      Libs.Php.icon,
    ].map((devIcon, indx) =>
      React.createElement(devIcon, { key: `${indx}-rocket-dev-stack` })
    ),
    features: [
      {
        icon: <RoleCard role={"Lead Dev"} />,
        content: (
          <Text fontWeight={600}>
            Desarrollador del proyecto desde el principio hasta la fecha.
          </Text>
        ),
      },
      {
        icon: <SecondaryLibs.MySQL.icon />,
        content: <Text fontWeight={600}>MySQL base de datos</Text>,
      },
      {
        icon: <CiLibs.Postman.icon />,
        content: (
          <Text fontWeight={600}>
            POSTMAN para pruebas de consumo de API
          </Text>
        ),
      },
    ].map((feature, indx) => (
      <Feature key={`${indx}-rocket-feature`} {...feature} />
    )),
    previewImg: "images/sabasp.gif",
    preview: (
      <AspectRatio
        w={{ base: isFrameLoading ? 300 : 256, md: 300, lg: 500 }}
        h={{
          base: isFrameLoading ? 350 : 256,
          md: isFrameLoading ? 300 : 350,
          lg: isFrameLoading ? 300 : 350,
        }}
      >
        <>
          <iframe
            style={{ borderRadius: 15 }}
            onLoad={() => setFrameLoading(false)}
            src="https://www.youtube.com/embed/i_fvKbrkJ94"
            title="SabasPOS"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      </AspectRatio>
    ),
  },
  {
    title: "🎲 Game Over",
    subTitle: "Video Juegos",
    description:
      "Game Over es una Single Page Application (SPA), hecha como trabajo de PI soyHenry",
    devStack: [
      Libs.JavaScript.icon,
      SecondaryLibs.Postgres.icon,
      SecondaryLibs.html.icon,
      SecondaryLibs.css.icon,
      SecondaryLibs.Express.icon,
      SecondaryLibs.ESLint.icon,
      Libs.React.icon,
      Libs.NodeJS.icon,
      CiLibs.Redux.icon,
      SecondaryLibs.Sequelize.icon,
    ].map((devIcon, indx) =>
      React.createElement(devIcon, { key: `${indx}-ou-dev-stack` })
    ),
    features: [
      {
        icon: <RoleCard role={"Lead Dev"} />,
        content: (
          <Text fontWeight={600}>
            VideoGames es una Single Page Application utilizando las tecnologías:
            React, Redux, Node, Express y Sequelize, hecha como trabajo de PI soyHenry
          </Text>
        ),
      },
      {
        icon: <CiLibs.Postman.icon />,
        content: (
          <Text fontWeight={600}>
            POSTMAN para pruebas de consumo de API
          </Text>
        ),
      },
      {
        icon: <CiLibs.Vercel.icon />,
        content: <Text fontWeight={600}>Repo distributed Vercel + Railway + Neon</Text>,
      },
    ].map((feature, indx) => (
      <Feature key={`${indx}-ou-feature`} {...feature} />
    )),
    previewImg: "images/slots.png",
    preview: (
      <AspectRatio
        w={{ base: isFrameLoading ? 300 : 256, md: 300, lg: 500 }}
        h={{
          base: isFrameLoading ? 350 : 256,
          md: isFrameLoading ? 300 : 350,
          lg: isFrameLoading ? 300 : 350,
        }}
      >
        <>
          <iframe
            style={{ borderRadius: 15 }}
            onLoad={() => setFrameLoading(false)}
            src="https://www.youtube.com/embed/ZFy69GDPOKI"
            title="SabasPOS"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      </AspectRatio>
    ),
  },

];