import { React, useEffect, useState } from "react";
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
} from "@chakra-ui/react";

export default function Myuserevents({ user, reload }) {
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

    let fetchstring = `http://localhost:4000/user/events?regno=${user}`;
    fetch(fetchstring, requestOptions)
      .then((response) => response.json())
      .then((result) => setEvents(result))
      .catch((error) => console.log("error", error));
  }, [reload]);

  const data = events;
  console.log("user events", events);
  const headers = ["Title", "Association", "Description", "Date-Time"];
  function formatDate(date) {
    let output = date.substring(0, 10);
    let year = output.substring(0, 4);
    let month = output.substring(5, 7);
    let day = output.substring(8, 10);
    return day + "/" + month + "/" + year;
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
            <Td></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
