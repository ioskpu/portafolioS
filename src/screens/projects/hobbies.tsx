import React, { FC, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { AspectRatio, Spinner, Code, Flex, VStack, Text, Button, Container, useColorModeValue, Box } from "@chakra-ui/react";
import { Project, Libs, SecondaryLibs, Feature, Socials, ExternalLink, CiLibs } from "@components";
import {Icons} from "../../components/Icons/icons";

const Trivia: FC = () => {
  const [questions, setQ] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setLoading] = useState(false);
  const getQuestions = async () => {
    try {
      setLoading(true);
      const raw = await fetch("https://the-trivia-api.com/v2/quizzes", {
        headers: {
          Accept: "application/json"
        }
      });
      const items = await raw.json() as { result?: Record<string, unknown>[] };
      if (items?.result?.length) {
        setQ(items.result);
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getQuestions();
  }, []);

  return (
    <Container bgColor={useColorModeValue("primary.300", "primary.700")} borderRadius={10} p={4}>
      <Button onClick={() => void getQuestions()} isLoading={isLoading} m={5}>New questions</Button>
      <Box>
        {isLoading ? <Spinner
          thickness='4px'
          speed='1.85s'
          emptyColor='primary.200'
          color='primary.500'
          size='xl'
        /> : questions.length >= 1 &&
      <ReactJson src={questions} collapsed={1} theme={"monokai"} displayDataTypes={false} name={"trivia"} style={{ borderRadius: 10 }} />
        }
      </Box>
    </Container>
  );
};

export const hobbies = (isFrameLoading: boolean, setFrameLoading: (l: boolean) => void): (Parameters<typeof Project>[0])[] => [
  {
    title: "❔ Quizinator",
    subTitle: "API",
    description: "10 random questions to test you are a dummy.",
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
        content={<Text fontWeight={600}>React: a JavaScript library for building user interfaces</Text>}
      />,
      <Feature
        key={"TrAxios"}
        icon={<CiLibs.Axios.icon />}
        content={<Text fontWeight={600}>Axios is a JS lib. used to make HTTP requests from nodejs or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6</Text>}
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
    description: "NodeJS + Knex + simple html, developed to display inspirational quotes",
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
        content={<Text fontWeight={600}>NodeJS: used to create server-side web applications, and it is perfect for data-intensive applications since it uses an asynchronous, event-driven mode</Text>}
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
    description: "Nice app made in react to consume the openweather api",
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
        key={"HotDescription"}
        icon={<Socials.GitHub to={"https://github.com/ioskpu/React-weather-app/blob/main/README.md"} />}
        content={<Code>Nice app to consume openweathermap.org api</Code>}
      />,
      
      <Feature
        key={"npmhot"}
        icon={<Icons.Weather.icon to={"https://react-weather-app-blond.vercel.app/"} />}
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