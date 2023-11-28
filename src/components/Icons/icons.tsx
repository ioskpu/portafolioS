import React, { FC } from "react";
import { portfolio } from "@config";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { IconLink as IconLinkBase } from "@components";
import { Flex, Icon as IconBase, Image as ImageBase, useColorModeValue } from "@chakra-ui/react";

//
import {
  SiTypescript, SiPostman, SiReact, SiCsharp, SiJavascript, SiDatadog, SiSequelize, SiPhp, SiRedux, SiSqlite,
  SiNextdotjs, SiNestjs, SiPostgresql, SiSocketdotio, SiDocker, SiKubernetes, SiDotnet, SiVercel,SiLaravel,
  SiCucumber, SiPrisma, SiEslint, SiOctopusdeploy, SiBamboo, SiBitbucket, SiCplusplus, SiExpress, SiHtml5, SiCss3, SiConfluence, SiJira, SiFastify, SiSwagger
} from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { GrMysql } from "react-icons/gr";
import { FaNpm } from "react-icons/fa";

const FlexIcon: FC = ({ children }) => <Flex
  w={12}
  h={12}
  align={"center"}
  justify={"center"}
  rounded={"full"}
  bgColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
  mb={1}>
  {children}
</Flex>;
const Icon: FC<Parameters<typeof IconBase>[0]> = (props) => <FlexIcon>
  <IconBase {...props} />
</FlexIcon>;
const IconLink: FC<Parameters<typeof IconLinkBase>[0]> = (props) => <FlexIcon>
  <IconLinkBase {...props} />
</FlexIcon>;
const Image: FC<Parameters<typeof ImageBase>[0]> = (props) => <FlexIcon>
  <ImageBase {...props} />
</FlexIcon>;

export const Socials = {
  GitHub: ({ to = portfolio.github }) => <IconLink
    to={to}
    icon={<BsGithub />}
    label={"github"}
    btnProps={{
      fontSize: "3xl"
    }}
  />,
  LinkedIn: () => <IconLink
    to={portfolio.linkedin}
    icon={<BsLinkedin size="28px" />}
    label={"linkedin"}
  />,
  Twitter: () => <IconLink
    to={portfolio.twitter}
    icon={<BsTwitter size="28px" />}
    label={"twitter"}
  />
};

export const Icons = {
  //Weather: { icon: () => <Image w={10} h={10} color={"blue.800"} src="https://www.freeiconspng.com/uploads/weather-icon-png-2.png" /> },
  Weather: { icon: () => <IconLink icon={<Image w={10} h={10} src="https://www.freeiconspng.com/uploads/weather-icon-png-2.png" />} to={"https://react-weather-app-blond.vercel.app/"} /> },
};

export const Libs = {
  NodeJS: { icon: () => <IconLink icon={<Icon as={IoLogoNodejs} w={10} h={10} color={"green.600"} />} to={"https://nodejs.org/en/"} />, level: 3 },
  JavaScript: { icon: () => <IconLink icon={<Icon as={SiJavascript} w={10} h={10} color={"#f0db4f"} />} to={"https://developer.mozilla.org/en-US/docs/Web/JavaScript"} />, level: 3 },
  Typescript: { icon: () => <IconLink icon={<Icon as={SiTypescript} w={10} h={10} color={"blue.600"} />} to={"https://www.typescriptlang.org/"} />, level: 2 },
  Python: { icon: () => <Image w={10} h={10} src="https://www.python.org/static/favicon.ico" />, level: 1 },
  Java: { icon: () => <Image w={10} h={10} src="https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" />, level: 1 },
  React: { icon: () => <IconLink icon={<Icon as={SiReact} w={10} h={10} color={"blue.200"} />} to={"https://reactjs.org/"} />, level: 2 },
  //ReactNative: { icon: () => <IconLink icon={<Icon as={SiReact} w={10} h={10} color={"blue.300"} />} to={"https://reactnative.dev/"} />, level: 3 },
  Dotnet: { icon: () => <IconLink icon={<Icon as={SiDotnet} w={10} h={10} color={"purple.300"} />} to={"https://dotnet.microsoft.com/en-us/"} />, level: 2, title: ".NET" },
  Csharp: { icon: () => <Icon as={SiCsharp} w={10} h={10} color={"green.400"} />, level: 2, title: "C#" },
  //Cpp: { icon: () => <Icon as={SiCplusplus} w={10} h={10} color={"blue.700"} />, level: 1, title: "C++" },
  //GO: { icon: () => <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/215px-Go_Logo_Blue.svg.png" />, level: 1 },
  //PHP: { icon: () => <Image w={10} h={10} scr="https://pngimg.com/uploads/php/php_PNG10.png"/>, level: 2},
  Php: { icon: () => <Icon as={SiPhp} w={10} h={10} color={"blue.600"} />, level: 2 },
};

export const SecondaryLibs = {
  Knex: { icon: () => <IconLink icon={<Image w={10} src="images/knex.png" />} to={"https://knexjs.org/"} />, level: 1 },
  CucumberJS: { icon: () => <IconLink icon={<Icon as={SiCucumber} w={10} h={10} color={"green.500"} />} to={"https://cucumber.io/docs/installation/javascript/"} />, level: 1 },
  Sequelize: { icon: () => <IconLink icon={<Icon as={SiSequelize} w={10} h={10} color={"blue.400"} />} to={"https://sequelize.org/"} />, level: 2 },
  Prisma: { icon: () => <Icon as={SiPrisma} w={10} h={10} color={"blue.800"} />, level: 1 },
  NestJS: { icon: () => <Icon as={SiNestjs} w={10} h={10} color={"red.600"} />, level: 1 },
  Fastify: { icon: () => <IconLink icon={<Icon as={SiFastify} w={10} h={10} color={"gray.600"} />} to={"https://www.fastify.io/"} />, level: 1 },
  MySQL: { icon: () => <IconLink icon={<Icon as={GrMysql} w={10} h={10} color={"blue.500"} />} to={"https://www.mysql.com/"} />, level: 2 },
  Postgres: { icon: () => <IconLink icon={<Icon as={SiPostgresql} w={10} h={10} color={"blue.600"} />} to={"https://www.postgresql.org/"} />, level: 2 },
  Redis: { icon: () => <Image w={10} h={10} src="https://pbs.twimg.com/profile_images/1285653263824691205/mu4nJ7Gb_normal.png" />, level: 1 },
  //Koa: { icon: () => <IconLink icon={<Image w={10} src="images/koa.jpg" />} to={"https://koajs.com/"} />, level: 4 },
  SocketIO: { icon: () => <Icon as={SiSocketdotio} w={10} h={10} color={"gray.800"} />, level: 2 },
  Swagger: { icon: () => <IconLink icon={<Icon as={SiSwagger} w={10} h={10} color={"green.400"} />} to={"https://swagger.io/"} />, level: 2 },
  Jest: { icon: () => <IconLink icon={<Image w={10} h={10} src="https://jestjs.io/img/jest.png" />} to={"https://jestjs.io"} />, level: 2 },
  ESLint: { icon: () => <IconLink icon={<Icon as={SiEslint} w={10} h={10} color={"purple.800"} />} to={"https://eslint.org/"} />, level: 3 },
  Express: { icon: () => <Icon as={SiExpress} w={10} h={10} color={"gray.600"} />, level: 2 },
  npm: { icon: ({ to }: { to?: string }) => <IconLink icon={<Icon as={FaNpm} w={10} h={10} color={"red.600"} />} to={to || "https://www.npmjs.com/"} />, level: 3 },
  html: { icon: () => <IconLink icon={<Icon as={SiHtml5} w={10} h={10} color={"orange.400"} />} to={"https://developer.mozilla.org/en-US/docs/Web/HTML"} />, level: 3 },
  css: { icon: () => <IconLink icon={<Icon as={SiCss3} w={10} h={10} color={"teal.400"} />} to={"https://developer.mozilla.org/en-US/docs/Web/CSS"} />, level: 2 },
};
//https://laravel.com/docs/10.x/readme
export const CiLibs = {
  Sqlite: { icon: () => <IconLink icon={<Icon as={SiSqlite} w={10} h={10} color={"purple.600"} />} to= {"https://www.sqlite.org/"} />, level: 2 },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  Laravel: { icon: () => <IconLink icon={<Icon as={SiLaravel} w={10} h={10} color={"red.600"} />} to= {"https://laravel.com/"}/>, level: 1 },
  Redux: { icon: () => <IconLink icon={<Icon as={SiRedux} w={10} h={10} color={"purple.600"} />} to= {"https://redux.js.org/"}/>, level: 3 },
  Vercel: { icon: () => <Icon as={SiVercel} w={10} h={10} color={"blue.600"} />, level: 3 },
  //Php: { icon: () => <Icon as={SiPhp} w={10} h={10} color={"blue.600"} />, level: 2 },
  Postman: { icon: () => <IconLink icon={<Icon as={SiPostman} w={10} h={10} color={"orange.500"} />} to= {"https://www.postman.com/"}/>, level: 2 },
  //DataDog: { icon: () => <Icon as={SiDatadog} w={10} h={10} color={"purple.600"} />, level: 3 },
  Docker: { icon: () => <Icon as={SiDocker} w={10} h={10} color={"blue.400"} />, level: 1 },
  Kubernetes: { icon: () => <Icon as={SiKubernetes} w={10} h={10} color={"blue.600"} />, level: 1 },
  //OctopusDeploy: { icon: () => <Icon as={SiOctopusdeploy} w={10} h={10} color={"blue.400"} />, level: 4 },
  //Jenkins: { icon: () => <Image src="https://www.jenkins.io/images/logos/jenkins/jenkins.svg" />, level: 4 },
  AWS: { icon: () => <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png?20170912170050" />, level: 1 },
  //Bamboo: { icon: () => <Icon as={SiBamboo} w={10} h={10} color={"blue.600"} />, level: 4 },
  BitBucket: { icon: () => <Icon as={SiBitbucket} w={10} h={10} color={"blue.800"} />, level: 1 },
  //Confluence: { icon: () => <Icon as={SiConfluence} w={10} h={10} color={"blue.600"} />, level: 4 },
  Jira: { icon: () => <Icon as={SiJira} w={10} h={10} color={"blue.600"} />, level: 1 },
  Axios: { icon: () => <IconLink icon={<Image w={10} src="images/axios_icon.png" />} to={"https://axios-http.com/docs/intro"} />, level: 2 },
  ReactBootstrap: { icon: () => <IconLink icon={<Image w={10} src="images/ReactBootstrap.png" />} to={"https://react-bootstrap.netlify.app/docs/getting-started/introduction"} />, level: 2 },
};