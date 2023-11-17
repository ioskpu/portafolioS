import React, { FC } from "react";
import { AspectRatio, Spinner, VStack, Text, Badge, useColorModeValue, UnorderedList, ListItem } from "@chakra-ui/react";
import { Project, Libs, SecondaryLibs, Feature, CiLibs } from "@components";
import { useThemeProvider } from "@hooks";
import { CgProfile } from "react-icons/cg";

const RoleCard: FC<{ role: string }> = ({ role }) => {
  const { theme } = useThemeProvider();
  return <VStack textAlign={"center"} color={useColorModeValue("primary.300", "primary.500")}>
    <CgProfile size={35} />
    <Text fontWeight='bold'>
            Rol
      <Badge colorScheme={theme}>
        {role}
      </Badge>
    </Text>
  </VStack>;
};

export const work = (isFrameLoading: boolean, setFrameLoading: (l: boolean) => void): (Parameters<typeof Project>[0])[] => [
  {
    title: "Sabas POS",
    subTitle: "Sistema ERP",
    description: "Sabas POS es un ERP (por sus siglas en ingles ‘Planificación de Recursos Empresariales’) es un conjunto de aplicaciones de software integradas + POS (punto de venta)",
    devStack: [
      Libs.JavaScript.icon, SecondaryLibs.MySQL.icon,
      SecondaryLibs.html.icon, SecondaryLibs.css.icon, SecondaryLibs.ESLint.icon, CiLibs.Php.icon,
    ].map((devIcon, indx) => React.createElement(devIcon, { key: `${indx}-rocket-dev-stack` })),
    features: [
      {
        icon: <RoleCard role={"Lead Dev"} />,
        content: <Text fontWeight={600}>Desarrollador del proyecto desde el principio hasta la fecha.</Text>
      },
      {
        icon: <SecondaryLibs.MySQL.icon />,
        content: <Text fontWeight={600}>MySQL base de datos</Text>
      },
      {
        icon: <CiLibs.Postman.icon />,
        content: <Text fontWeight={600}>POSTMAN para pruebas de consumo de API</Text>
      },
    ].map((feature, indx) => <Feature key={`${indx}-rocket-feature`} {...feature} />),
    previewImg: "images/sabasp.gif",
    preview: <AspectRatio w={{ base: isFrameLoading ? 300 : 256, md: 300, lg: 500 }} h={{ base: isFrameLoading ? 350 : 256, md: isFrameLoading ? 300 : 350, lg: isFrameLoading ? 300 : 350 }}>
      <>
        {isFrameLoading && <Spinner
          thickness='4px'
          speed='1.85s'
          emptyColor='primary.200'
          color='primary.500'
          size='xs'
        />}
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
  },
  {
    title: "🎲 Game Over",
    subTitle: "Video Juegos",
    description: "Game Over es una Single Page Application (SPA), hecha como trabajo de PI soyHenry",
    devStack: [
      Libs.JavaScript.icon,
      SecondaryLibs.Postgres.icon, SecondaryLibs.html.icon, SecondaryLibs.css.icon, SecondaryLibs.Express.icon,
      SecondaryLibs.ESLint.icon, Libs.React.icon, Libs.NodeJS.icon, CiLibs.Redux.icon, SecondaryLibs.Sequelize.icon
    ].map((devIcon, indx) => React.createElement(devIcon, { key: `${indx}-ou-dev-stack` })),
    features: [
      {
        icon: <RoleCard role={"Lead Dev"} />,
        content: <Text fontWeight={600}>
                    VideoGames es una Single Page Application utilizando las tecnologías: React, Redux, Node, Express y Sequelize, hecha como trabajo de PI soyHenry
        </Text>
      },
      {
        icon: <CiLibs.Vercel.icon />,
        content: <Text fontWeight={600}>Repo distributed Vercel + Railway + Neon</Text>
      }
    ].map((feature, indx) => <Feature key={`${indx}-ou-feature`} {...feature} />),
    preview: <AspectRatio w={{ base: isFrameLoading ? 300 : 256, md: 300, lg: 500 }} h={{ base: isFrameLoading ? 350 : 256, md: isFrameLoading ? 300 : 350, lg: isFrameLoading ? 300 : 350 }}>
      <>
        {isFrameLoading && <Spinner
          thickness='4px'
          speed='1.85s'
          emptyColor='primary.200'
          color='primary.500'
          size='xs'
        />}
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
  },
  {
    title: "🎰 Casino Products",
    subTitle: "APIs, Back-office tools (FE|BE)",
    description: "Various services developed for the lifecycle of an online casino | casino hub.",
    devStack: [
      Libs.Dotnet.icon, Libs.Csharp.icon, Libs.NodeJS.icon, Libs.Typescript.icon, Libs.JavaScript.icon,
      SecondaryLibs.Postgres.icon, SecondaryLibs.MySQL.icon, SecondaryLibs.html.icon, SecondaryLibs.css.icon, SecondaryLibs.Redis.icon,
      CiLibs.OctopusDeploy.icon, CiLibs.Jira.icon, CiLibs.Bamboo.icon, CiLibs.BitBucket.icon, CiLibs.Confluence.icon, CiLibs.AWS.icon, CiLibs.Jenkins.icon
    ].map((devIcon, indx) => React.createElement(devIcon, { key: `${indx}-cp-dev-stack` })),
    features: <UnorderedList>
      {[
        "Improve casino services to expand product feature set and accelerate development.",
        "Develop pipeline improvements that reduce costs and time requirements for maintaining existing products and building new products and integrating new providers.",
        "Create tools and systems that enhance ability to debug, test, and react to customer and client feedback.",
        "Work across teams to provide client side support for larger infrastructure initiatives.",
        "Maintain casino services and ensure their consistent success."]
        .map((bullet, indx) =>
          <ListItem key={`${indx}-cp-bullets`}>
            <Text fontWeight={600}>
              {bullet}
            </Text>
          </ListItem>)}
    </UnorderedList>,
    previewImg: "images/slots.jpg",
  },
];