import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginHost({ host, setHost }) {
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
    var raw = "";
    var fetchstring = `http://localhost:4000/auth_asc?association=${formData.association}&password=${formData.password}`;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(fetchstring, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          setHost(formData.association);
          navigate("../host", { replace: true });
        }
      })
      .catch((error) => console.log("error", error));
    // ... submit to API or something
  };
  return (
    <Stack spacing={4}>
      <FormControl id="name">
        <FormLabel>Association Name</FormLabel>
        <Input type="name" name="association" onChange={handleChange} />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" onChange={handleChange} />
      </FormControl>
      <Stack spacing={10}>
        <Stack direction={{ base: "column", sm: "row" }} align={"start"}>
          <Link color={"blue.400"}>Forgot password?</Link>
        </Stack>
        <Stack direction={{ base: "column", sm: "row" }} align={"start"}>
          <Button
            width="100%"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            Sign in as Host
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
