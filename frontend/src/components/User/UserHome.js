import { Box } from "@chakra-ui/layout";
import {
  Flex,
  Stack,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { React, useState } from "react";
import Myuserevents from "./Myuserevents";
import Usertable from "./Usertable";
import Navbar from "./Navbar";

export default function UserHome({ user, setUser }) {
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(true);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Flex
      direction="column"
      minH={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("purple.50", "gray.800")}
    >
      <Box
        bg={useColorModeValue("white", "gray.600")}
        w="100%"
        mt={0}
        boxShadow={"sm"}
      >
        <Navbar user={user} setUser={setUser} />
      </Box>

      <Box
        mt={5}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        minW="xl"
        p={8}
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "blue.500" }}>
              <Text fontSize="xl" fontWeight="black">
                Upcoming Events
              </Text>
            </Tab>
            <Tab _selected={{ color: "white", bg: "blue.500" }}>
              <Text fontSize="xl" fontWeight="black">
                My Events
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack align="center" pb={8} px={7}>
                <InputGroup maxW="sm">
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="tel"
                    placeholder="Search Events"
                    onChange={handleSearch}
                  />
                </InputGroup>
              </Stack>
              <Usertable item={search} user={user} setReload={setReload} />
            </TabPanel>
            <TabPanel>
              <Myuserevents user={user} reload={reload} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
