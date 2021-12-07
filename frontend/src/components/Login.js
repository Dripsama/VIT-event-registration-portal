import { React } from "react";
import {
  Box,
  Stack,
  Link,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link as RouteLink } from "react-router-dom";
import LoginUser from "./LoginUser";
import LoginHost from "./LoginHost";

export default function Login({ user, setUser, host, setHost }) {
  return (
    <Stack spacing={8} mx={"auto"} minW={"md"} maxW={"lg"}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign in
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          Need an account?{" "}
          <Link as={RouteLink} color={"blue.400"} to="/signup">
            Sign up for free
          </Link>
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "blue.500" }}>
              <Text fontSize="md" fontWeight="black">
                Student User
              </Text>
            </Tab>
            <Tab _selected={{ color: "white", bg: "blue.500" }}>
              <Text fontSize="md" fontWeight="black">
                Event Host
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginUser user={user} setUser={setUser} />
            </TabPanel>
            <TabPanel>
              <LoginHost host={host} setHost={setHost} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  );
}
