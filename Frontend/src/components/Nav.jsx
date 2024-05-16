import { Flex, Text, Link, useColorMode, Button } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}

      {!user && (
        <Link as={RouterLink} to={"/auth"} onClick={
          ()=>setAuthScreen('login')
        }>
          ReEnter Sphere
        </Link>
      )}

      <Text
        cursor={"pointer"}
        color={colorMode === "dark" ? "black" : "white"}
        onClick={toggleColorMode}
        className="text-3xl font-bold"
      >
        EchoSphere
      </Text>

      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`${user.username}`}>
            <RxAvatar size={24} />
          </Link>

          <Button size={"sm"} onClick={logout}>
            <BiPowerOff size={25} color="red" />
          </Button>
        </Flex>
      )}

    {!user && (
        <Link as={RouterLink} to={"/auth"} onClick={
          ()=>setAuthScreen('signup')
        }>
          Get Started
        </Link>
      )}
    </Flex>
  );
};

export default Nav;
