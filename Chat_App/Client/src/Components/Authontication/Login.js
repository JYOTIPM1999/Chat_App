import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [smtpMail, setSmtpMail] = useState("");
  const [text, setText] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !setPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          email,
          password,
        }
      );

      // console.log(data);

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // const loginWithGithub = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:8080/api/user/github/callback"
  //     );

  //     console.log(data);

  //     toast({
  //       title: "Registration Successful",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     // localStorage.setItem("userInfo", JSON.stringify(data));
  //     // setLoading(false);
  //     // navigate("/chats");
  //   } catch (error) {
  //     console.log(error);
  //     toast({
  //       title: "Error Occured!",
  //       description: error.response.data.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   }
  // };

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/user/mail", {
        smtpMail,
        text,
      });

      console.log(data);

      toast({
        title: "Sent mail Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // navigate("/chats");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing={"5px"} color="black">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme={"gray"}
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme={"red"}
        w={"100%"}
        onClick={() => {
          setEmail("guest@jpm.com");
          setPassword("1234abc");
        }}
      >
        Get guest user credentials
      </Button>
      {/* <Link href="https://github.com/login/oauth/authorize?client_id=2fe84f62637d16727cf2">
        <Button
          variant={"solid"}
          colorScheme={"red"}
          w={"100%"}
          onClick={loginWithGithub}
        >
          Login with Github
        </Button>
      </Link> */}
      <form
        onSubmit={sendMail}
        style={{
          // border: "1px solid red",
          marginTop: "20px",
          width: "100%",
          margin: "auto",
        }}
      >
        <label
          style={{
            marginLeft: "30%",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Need help? Contact us
        </label>
        <br />
        <input
          placeholder="Enter Your Email"
          value={smtpMail}
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            padding: "5px",
            marginLeft: "30%",
          }}
          onChange={(e) => setSmtpMail(e.target.value)}
        />
        <br />
        <input
          placeholder="Enter Your Text"
          value={text}
          style={{
            marginBottom: "10px",
            marginLeft: "30%",
            borderRadius: "5px",
            padding: "5px",
          }}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <input
          type="submit"
          style={{
            borderRadius: "10px",
            marginLeft: "40%",
            background: "red",
            padding: "10px",
          }}
        />
      </form>
    </VStack>
  );
};

export default Login;
