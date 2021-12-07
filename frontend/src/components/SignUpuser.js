import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  Link,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function SignUpuser() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, updateFormData] = useState();
  let navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // ... submit to API or something
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(formData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/adduser", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          navigate("../", { replace: true });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Stack spacing={4}>
      <FormControl id="Name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" onChange={handleChange} />
      </FormControl>
      <HStack>
        <Box width="100%">
          <FormControl id="Regno" isRequired>
            <FormLabel>Registration Number</FormLabel>
            <Input type="text" name="regno" onChange={handleChange} />
          </FormControl>
        </Box>
        <Box width="100%">
          <FormControl id="mobile" isRequired>
            <FormLabel>Mobile-Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+091" />
              <Input
                type="number"
                placeholder="mobile"
                name="mobile_number"
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
        </Box>
      </HStack>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack spacing={10} pt={2}>
        <Button
          loadingText="Submitting"
          size="lg"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </Stack>
      <Stack pt={3}>
        <Text align={"center"}>
          Already a user?{" "}
          <Link color={"blue.400"} as={RouteLink} to="/">
            Login
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
}
