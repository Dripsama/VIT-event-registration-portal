import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import SignUpuser from "./SignUpuser";
import SignUphost from "./SignUphost";

export default function SignUp() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        align={"center"}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          minWidth="xl"
        >
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab _selected={{ color: "white", bg: "blue.500" }}>
                <Text fontSize="xl" fontWeight="black">
                  Student User
                </Text>
              </Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>
                <Text fontSize="xl" fontWeight="black">
                  Event Host
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignUpuser />
              </TabPanel>
              <TabPanel>
                <SignUphost />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Flex>
  );
}
