import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  Stack,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userdata, setUserdata] = useState();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:4000/userdata?regno=${user}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setUserdata((userdata) => result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Flex h={16} alignItems={"center"} justifyContent={"space-between"} px={8}>
      <Flex alignItems="center">
        <Avatar
          size="md"
          src="https://i.pinimg.com/originals/12/4f/55/124f55209dacad4cffd468e2997e1dec.jpg"
        />
        <Text fontSize="md" fontWeight="black" mx={3}>
          Event Portal
        </Text>
      </Flex>
      <Flex alignItems={"center"}>
        <Stack direction={"row"} spacing={7} justifyContent="center">
          {/* <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button> */}
          <Menu>
            <MenuButton>
              <Avatar bg="teal.500" />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar size={"xl"} bg="teal.500" />
              </Center>
              <br />
              <Center>
                <p>
                  Regno: <b>{userdata ? userdata[0].regno : <p></p>}</b>
                </p>
              </Center>
              <Center>
                <p>
                  Name: <b>{userdata ? userdata[0].name : <p></p>}</b>
                </p>
              </Center>
              <Center>
                <p>
                  Mobile:{" "}
                  <b>{userdata ? userdata[0].mobile_number : <p></p>}</b>
                </p>
              </Center>
            </MenuList>
          </Menu>
        </Stack>
        <Button
          mx={4}
          as={RouteLink}
          to="/"
          colorScheme="teal"
          onClick={() => setUser(null)}
        >
          Sign out
        </Button>
      </Flex>
    </Flex>
  );
}
