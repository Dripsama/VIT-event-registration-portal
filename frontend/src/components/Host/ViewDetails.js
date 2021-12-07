import React from "react";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ViewDetails({ evid }) {
  console.log(evid);
  const [events, setEvents] = useState([
    {
      regno: "empty",
      name: "empty",
      mobile_number: "empty",
    },
  ]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var fetchstring = `http://localhost:4000/register/events?event_id=${evid}`;

    fetch(fetchstring, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEvents((events) => result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("purple.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        minW={"70%"}
        py={12}
        px={6}
        align={"center"}
      >
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w="70%"
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              View Registered Students
            </Heading>
          </Stack>
          <Flex justifyContent="flex-start" px={9} pb={7}>
            <Box>
              <Button
                as={RouteLink}
                colorScheme="teal"
                size="md"
                variant="outline"
                to="/host"
              >
                Back
              </Button>
            </Box>
          </Flex>
          <Table>
            <Thead>
              <Tr>
                <Th>RegNo</Th>
                <Th>Name</Th>
                <Th>Mobile Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((item) => (
                <Tr>
                  <Td>
                    <Text fontSize="lg">
                      <b>{item.regno}</b>
                    </Text>
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>{item.mobile_number}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
}
