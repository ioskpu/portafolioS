import React, { FC, useEffect, useState } from "react";
//import ReactJson from "react-json-view";
import { AspectRatio, Spinner, Code, Flex, VStack, Text, Button, Container, useColorModeValue, Box } from "@chakra-ui/react";
import { Project, Libs, SecondaryLibs, Feature, Socials, ExternalLink, CiLibs } from "@components";
import {Icons} from "../../components/Icons/icons";

// const Trivia: FC = () => {
//   const [questions, setQ] = useState<Record<string, unknown>[]>([]);
//   const [isLoading, setLoading] = useState(false);
//   const getQuestions = async () => {
//     try {
//       setLoading(true);
//       const raw = await fetch("https://the-trivia-api.com/v2/quizzes", {
//         headers: {
//           Accept: "application/json"
//         }
//       });
//       const items = await raw.json() as { result?: Record<string, unknown>[] };
//       if (items?.result?.length) {
//         setQ(items.result);
//       }
//     } catch (error) {
//       //
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     void getQuestions();
//   }, []);

//   return (
//     <Container bgColor={useColorModeValue("primary.300", "primary.700")} borderRadius={10} p={4}>
//       <Button onClick={() => void getQuestions()} isLoading={isLoading} m={5}>New questions</Button>
//       <Box>
//         {isLoading ? <Spinner
//           thickness='4px'
//           speed='1.85s'
//           emptyColor='primary.200'
//           color='primary.500'
//           size='xl'
//         /> : questions.length >= 1 &&
//       <ReactJson src={questions} collapsed={1} theme={"monokai"} displayDataTypes={false} name={"trivia"} style={{ borderRadius: 10 }} />
//         }
//       </Box>
//     </Container>
//   );
// };

export const hobbies = (isFrameLoading: boolean, setFrameLoading: (l: boolean) => void): (Parameters<typeof Project>[0])[] => [
  {
    title: "❔ Quizinator",
    subTitle: "API",
    description: "10 preguntas aleatorias para probar que eres humano.",
    devStack: [
      Libs.JavaScript.icon, SecondaryLibs.ESLint.icon, Libs.React.icon, CiLibs.ReactBootstrap.icon
    ].map((devIcon, indx) => React.createElement(devIcon, { key: `${indx}-rocket-dev-stack` })),
    features: [
      <Feature
        key={"QuizRepo"}
        icon={<Socials.GitHub to={"https://github.com/ioskpu/opentrivia"} />}
        content={<ExternalLink to={"https://github.com/ioskpu/opentrivia"} text={"repo"} />}
      />,
      <Feature
        key={"TrReact"}
        icon={<Libs.React.icon />}
        content={<Text fontWeight={600}>React: Una biblioteca de JavaScript para construir interfaces de usuario</Text>}
      />,
      <Feature
        key={"TrAxios"}
        icon={<CiLibs.Axios.icon />}
        content={<Text fontWeight={600}>Axios es una libreria de Javascript. Se utiliza para realizar solicitudes HTTP desde NodeJs o XMLHTTPRequests 
        desde el navegador y admite la API de promesa que es nativa de JS ES6</Text>}
      />,

    ],
    preview: (
      <AspectRatio w={600} h={isFrameLoading ? 600 : 800}>
        <>
          {isFrameLoading && <Spinner
            thickness='4px'
            speed='1.85s'
            emptyColor='primary.200'
            color='primary.500'
            size='xs'
          />}
          <iframe src='https://opentrivia-nine.vercel.app/' style={{ borderRadius: 15 }} onLoad={() => setFrameLoading(false)} scrolling="yes"/>
        </>
      </AspectRatio>
    )
  },
  {
    title: "💫 Quotes App",
    subTitle: "API",
    description: "NodeJS + KNEX + HTML, desarrollado para mostrar citas inspiradoras",
    devStack: [
      <Libs.NodeJS.icon key={"NodeW"} />,
      <Libs.JavaScript.icon key={"JSW"} />,
      <CiLibs.Sqlite.icon key={"SqliteW"} />,
      <SecondaryLibs.Knex.icon key={"KnexW"} />,
      <SecondaryLibs.html.icon key={"htmlW"} />,
      <SecondaryLibs.css.icon key={"cssW"} />,
      <SecondaryLibs.ESLint.icon key={"EslintW"} />,
    ],
    features: [
      <Feature
        key={"QuotesRepo"}
        icon={<Socials.GitHub to={"https://github.com/ioskpu/quotes-api"} />}
        content={<ExternalLink to={"https://github.com/ioskpu/quotes-api"} text={"repo"} />}
      />,
      <Feature
        key={"NodeJSQuotes"}
        icon={<Libs.NodeJS.icon />}
        content={<Text fontWeight={600}>NodeJS: se usa para crear aplicaciones web del lado del servidor, y es perfecto para los datos intensivos en los datos
        Aplicaciones ya que usa un modo asincrónico y basado en eventos</Text>}
      />
    ],
    preview: <AspectRatio w={400} h={isFrameLoading ? 400 : 600}>
      <>
        {isFrameLoading && <Spinner
          thickness='4px'
          speed='1.85s'
          emptyColor='primary.200'
          color='primary.500'
          size='xs'
        />}
        <iframe src='https://quotes-api-pi.vercel.app/' style={{ borderRadius: 15 }} onLoad={() => setFrameLoading(false)} scrolling="yes"/>
      </>
    </AspectRatio>
  },
  {
    title: "🔥 Weather",
    subTitle: "Api weather",
    description: "Aplicación hecha en React para consumir la API OpenWeather",
    devStack: [
      <Libs.NodeJS.icon key={"NodeHot"} />,
      <Libs.Typescript.icon key={"TSH"} />,
      <Libs.JavaScript.icon key={"JSH"} />,
      <SecondaryLibs.npm.icon key={"npmH"} to={"https://github.com/ioskpu/React-weather-app"} />,
      <SecondaryLibs.ESLint.icon key={"EslintH"} />,
      <SecondaryLibs.Jest.icon key={"jesth"} />,
    ],
    features: [
      <Feature
        key={"WeatherDescription"}
        icon={<Socials.GitHub to={"https://github.com/ioskpu/React-weather-app/blob/main/README.md"} />}
        content={<Code>API para consumir los datos de OpenWeathermap.org</Code>}
      />,

      <Feature
        key={"weather"}
        icon={<Icons.Weather.icon />}
        content={<ExternalLink to={"https://react-weather-app-blond.vercel.app/"} text={"React weather app"} />}
      />
    ],
    preview: <AspectRatio w={400} h={isFrameLoading ? 400 : 600}>
      <>
        {isFrameLoading && <Spinner
          thickness='4px'
          speed='1.85s'
          emptyColor='primary.200'
          color='primary.500'
          size='xs'
        />}
        <iframe src='https://react-weather-app-blond.vercel.app/' style={{ borderRadius: 15 }} onLoad={() => setFrameLoading(false)} scrolling="yes"/>
      </>
    </AspectRatio>
  },
 
];