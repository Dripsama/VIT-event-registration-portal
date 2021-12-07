import { React, useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Box,
  Stack,
  Container,
  Button,
} from "@chakra-ui/react";

export default function MyeventsTable({ host, setEvid }) {
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

    let fetchstring = `http://localhost:4000/association/events?association=${host}`;
    fetch(fetchstring, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEvents((events) => result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const headers = [
    "Event_id",
    "Title",
    "Description",
    "Date-Time",
    "Venue",
    "",
  ];
  function formatDate(date) {
    let output = date.substring(0, 10);
    let year = output.substring(0, 4);
    let month = output.substring(5, 7);
    let day = output.substring(8, 10);
    return day + "/" + month + "/" + year;
  }
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {headers.map((item) => (
            <Th key={item}>{item}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {events.map((item) => (
          <Tr>
            <Td>{item.event_id}</Td>
            <Td>
              <Text fontSize="lg">
                <b>{item.title}</b>
              </Text>
            </Td>
            <Td>
              <Container width="container.sm">{item.description}</Container>
            </Td>
            <Td>
              <Stack>
                <Box>
                  {formatDate(item.start_date)} - {formatDate(item.end_date)}
                </Box>
                <Box fontWeight="semibold">{item.time}</Box>
              </Stack>
            </Td>
            <Td>{item.venue}</Td>
            <Td>
              <Button
                colorScheme="blue"
                size="md"
                variant="outline"
                onClick={() => {
                  setEvid(item.event_id);
                }}
                as={RouteLink}
                to="/viewdetails"
              >
                + View Details
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
