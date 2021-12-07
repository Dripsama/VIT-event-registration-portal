import React from "react";
import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function AddEvent({ host }) {
  console.log(host);
  const [formData, updateFormData] = useState();
  let navigate = useNavigate();
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  function tConvert(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? "am" : "pm";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData((formData) => (formData.time = tConvert(formData.time)));

    updateFormData({
      ...formData,

      // Trimming any whitespace
      association: host,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(formData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (formData.association == host) {
      fetch("http://localhost:4000/addevent", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            navigate("../host", { replace: true });
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
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
              Add New Event
            </Heading>
          </Stack>
          <Flex justifyContent="flex-start" px={9} pb={7}>
            <Box>
              <RouteLink to="/host">
                <Button colorScheme="green" size="md" variant="outline">
                  Back
                </Button>
              </RouteLink>
            </Box>
          </Flex>
          <Stack spacing={6} px={9}>
            {/* <FormControl id="Association" isRequired>
              <FormLabel>Association Name</FormLabel>
              <Input type="text" name="association" onChange={handleChange} />
            </FormControl> */}
            <HStack>
              <FormControl id="Title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" name="title" onChange={handleChange} />
              </FormControl>
              <FormControl id="Venue" isRequired>
                <FormLabel>Venue</FormLabel>
                <Input type="text" name="venue" onChange={handleChange} />
              </FormControl>
            </HStack>
            <FormControl id="Description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                name="description"
                onChange={handleChange}
              />
            </FormControl>
            <HStack>
              <FormControl id="Start_date" isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl id="End_date" isRequired>
                <FormLabel>End Date</FormLabel>
                <Input type="date" name="end_date" onChange={handleChange} />
              </FormControl>
              <FormControl id="Time" isRequired>
                <FormLabel>Time</FormLabel>
                <Input type="time" name="time" onChange={handleChange} />
              </FormControl>
            </HStack>
            <Flex justifyContent="flex-end">
              <Button colorScheme="green" size="lg" onClick={handleSubmit}>
                Add Event
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
