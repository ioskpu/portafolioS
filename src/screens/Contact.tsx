import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { portfolio, email } from "@config";
import { BaseModal, Socials, Title } from "@components";
import { Field, Form, Formik, FormikHelpers } from "formik";
import emailjs from "@emailjs/browser";

type FormValues = { name?: string; email?: string; message?: string };

export const Contact = () => {
  const { hasCopied, onCopy } = useClipboard(portfolio.email);
  const [showModal, setShowModal] = useState<{ show: true; response: string } | { show: false; response?: string }>({ show: false });
  const sendEmail = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        {
          from_name: values.name,
          message: values.message,
          reply_to: values.email
        },
        import.meta.env.VITE_EMAILJS_USER_ID as string
      );

      setShowModal({ show: true, response: "Email sent." });
      actions.setSubmitting(false);
    } catch (error) {
      console.error("Error sending email:", error);
      setShowModal({ show: true, response: "Error on sending email." });
      actions.setSubmitting(false);
    }
  };

  return (
    <Box>
      <Title
        title={"Mantente en contacto"}
        subTitle={"escribeme o contactame en cualquiera de mis redes sociales."}
      />
      {showModal.show &&
      <BaseModal title="Email" content={showModal.response} isOpen={showModal.show} onClose={() => setShowModal({ show: false })} />}
      <VStack spacing={{ base: 2, md: 4, lg: 22 }}>
        <Stack
          spacing={{ base: 2, md: 4, lg: 22 }}
          direction={{ base: "column", md: "row" }}>
          <Stack
            align="center"
            justify="space-around"
            direction={{ base: "row", md: "column" }}>
            <Tooltip
              label={hasCopied ? "Email Copiado!" : "Copiar Email"}
              closeOnClick={false}
              hasArrow>
              <IconButton
                aria-label="email"
                variant="ghost"
                size="lg"
                fontSize="3xl"
                icon={<MdEmail />}
                _hover={{
                  bg: useColorModeValue("primary.700", "primary.50"),
                  color: useColorModeValue("primary.50", "primary.700"),
                }}
                onClick={onCopy}
                isRound
              />
            </Tooltip>

            <Socials.GitHub />
            <Socials.Twitter />
            <Socials.LinkedIn />
          </Stack>

          <Box
            bg={useColorModeValue("primary.50", "primary.700")}
            borderRadius="lg"
            p={6}
            color={useColorModeValue("primary.700", "primary.50")}
            shadow="base">
            <Formik<FormValues>
              initialValues={{ name: undefined, email: undefined, message: undefined }}
              onSubmit={sendEmail}
            >
              {(props) => (
                <Form>
                  <Field name='name'>
                    {({ field }: { field: unknown }) => (
                      <FormControl isRequired marginBottom={5}>
                        <FormLabel htmlFor='name'>Nombre</FormLabel>
                        <InputGroup>
                          <InputLeftElement>
                            <BsPerson />
                          </InputLeftElement>
                          <Input {...field} type="text" id="name" placeholder="Tú nombre" />
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='email'>
                    {({ field }: { field: unknown }) => (
                      <FormControl isRequired marginBottom={5}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <InputGroup>
                          <InputLeftElement>
                            <MdOutlineEmail />
                          </InputLeftElement>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Tú Email"
                          />
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='message'>
                    {({ field }: { field: unknown }) => (
                      <FormControl isRequired marginBottom={5}>
                        <FormLabel>Mensaje</FormLabel>
                        <Textarea
                          {...field}
                          id="message"
                          placeholder="Tú mensaje"
                          rows={6}
                          resize="none"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    isLoading={props.isSubmitting}
                    type='submit'
                    colorScheme="blue"
                    bg={useColorModeValue("primary.300", "primary.500")}
                    color="white"
                    _hover={{
                      bg: useColorModeValue("primary.200", "primary.400"),
                    }}
                    isFullWidth>
                    Enviar mensaje
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </VStack>
    </Box>
  );
};
