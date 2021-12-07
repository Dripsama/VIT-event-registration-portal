import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUphost() {
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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(formData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/addasc", requestOptions)
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
      <FormControl id="ascName" isRequired>
        <FormLabel> Association Name</FormLabel>
        <Input type="text" name="association" onChange={handleChange} />
      </FormControl>
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
              onClick={() => setShowPassword((showPassword) => !showPassword)}
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
