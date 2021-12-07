import { Box, Heading } from "@chakra-ui/layout";
import { Flex, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link as RouteLink } from "react-router-dom";
import MyeventsTable from "./MyeventsTable";
import Navbar from "./Navbar";

export default function HostHome({ host, setHost, setEvid }) {
  console.log(host);
  return (
    <Flex
      direction="column"
      minH={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("purple.50", "gray.800")}
    >
      <Box
        bg={useColorModeValue("white", "gray.700")}
        w="100%"
        mt={0}
        boxShadow={"sm"}
      >
        <Navbar host={host} setHost={setHost} />
      </Box>
      <Box
        mt={5}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        minW="xl"
        p={8}
      >
        <Flex justifyContent="space-between" px={8} pb={7}>
          <Box p="2">
            <Heading size="lg">My Events</Heading>
          </Box>
          <Box>
            <RouteLink to="/addevent">
              <Button colorScheme="green" size="md">
                + Event
              </Button>
            </RouteLink>
          </Box>
        </Flex>
        <MyeventsTable host={host} setEvid={setEvid} />
      </Box>
    </Flex>
  );
}
