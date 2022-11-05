import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../Components/Authontication/Login";
import Signup from "../Components/Authontication/Signup";
import { useNavigate } from "react-router-dom";
export const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW={"xl"}>
      <Box
        display="flex"
        justifyContent={"center"}
        p={4}
        bg={"gray"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Text color={"white"} fontSize="4xl">
          Trade A Tive
        </Text>
      </Box>
      <Box
        bg={"gray"}
        p={4}
        w={"100%"}
        color="white"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1rem"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
