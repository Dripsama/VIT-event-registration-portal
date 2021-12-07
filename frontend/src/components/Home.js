import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";

import Login from "./Login";

export default function Home({ user, setUser, host, setHost }) {
  return (
    <Box position={"relative"} minH={"100vh"} bg="purple.50">
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 20 }}
        py={{ base: 10, sm: 10, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 2 }} mt={12} pt={3}>
          <Heading fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src="https://i.pinimg.com/originals/12/4f/55/124f55209dacad4cffd468e2997e1dec.jpg"
            />
            VIT Event Registration Portal
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Text
              mb={{ base: 10, md: 4 }}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="thin"
              color="gray.500"
              letterSpacing="wider"
            >
              Our VIT Event Registration System allows student users to register
              for events with one click. Clubs/Chapters event host can add and
              manage events.
            </Text>
          </Stack>
        </Stack>
        <Login user={user} setUser={setUser} host={host} setHost={setHost} />
      </Container>
    </Box>
  );
}
