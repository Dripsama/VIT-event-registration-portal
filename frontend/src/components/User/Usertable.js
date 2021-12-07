import { React, useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Stack,
  Container,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
} from "@chakra-ui/react";

export default function Usertable({ item, user, setReload }) {
  const [events, setEvents] = useState([
    {
      event_id: "empty",
      title: "empty",
      association: "empty",
      start_date: "0000-00-0000:30:00.000Z",
      end_date: "0000-00-0000:30:00.000Z",
      time: "00:00",
      description: "empty",
      venue: "empty",
    },
  ]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/events", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEvents(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  //   console.log(events.filter((n) => !filterlist.includes(n)));
  let newdata = events.filter((i) => {
    if (item !== undefined) {
      if (i.title.toLowerCase().includes(item.toLowerCase())) {
        return i;
      }
    }
  });
  const data = newdata;

  const headers = [
    "Title",
    "Association",
    "Description",
    "Date-Time",
    "Action",
  ];
  function formatDate(date) {
    let output = date.substring(0, 10);
    let year = output.substring(0, 4);
    let month = output.substring(5, 7);
    let day = output.substring(8, 10);
    return day + "/" + month + "/" + year;
  }

  function handleRegister(event_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      event_id: event_id,
      regno: user,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/adduser_register", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return (
    <Table variant="simple" minW="lg">
      <Thead>
        <Tr>
          {headers.map((item) => (
            <Th key={item}>{item}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.event_id}>
            <Td>
              <Text fontSize="lg">
                <b>{item.title}</b>
              </Text>
            </Td>
            <Td>{item.association}</Td>
            <Td>
              <Container maxW="container.sm">{item.description}</Container>
            </Td>
            <Td>
              <Stack>
                <Box>
                  {formatDate(item.start_date)} - {formatDate(item.end_date)}
                </Box>
                <Box fontWeight="semibold">{item.time}</Box>
              </Stack>
            </Td>
            <Td>
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="blue" size="md">
                    Register
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverHeader fontWeight="bold">
                      Confirmation
                      <PopoverArrow />
                      <PopoverCloseButton />
                    </PopoverHeader>
                    <PopoverBody fontWeight="normal">
                      Are you sure you want to register for the event ?
                    </PopoverBody>
                    <PopoverFooter d="flex" justifyContent="flex-end">
                      <Button
                        colorScheme="blue"
                        size="md"
                        onClick={() => {
                          handleRegister(item.event_id);
                          setReload((reload) => !reload);
                        }}
                      >
                        Confirm
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
