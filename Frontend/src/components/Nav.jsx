import { Flex, Text, useColorMode } from "@chakra-ui/react";

const Nav = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
      <Text
        cursor={"pointer"}
        color={colorMode === "dark" ? "white" : "black"}
        onClick={toggleColorMode}
        className="text-3xl font-bold"
      >
        Tootar
      </Text>
      
    </Flex>
  );
};

export default Nav;
