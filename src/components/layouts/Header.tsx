'use client';

import {
  Box,
  Container,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      width="full"
      height={85}
      backgroundColor={
        colorMode === 'light'
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(23, 25, 35, 0.8)'
      }
      backdropFilter="blur(10px)"
      position="fixed"
      zIndex={5}>
      <Container
        as="nav"
        maxWidth="container.lg"
        height="full"
        paddingY={2}
        centerContent>
        <HStack justifyContent="space-between" width="full">
          <HStack>
            <Image src="/icons/icon-512x512.png" alt="Logo" width={70} />
            <Box>
              <Heading as="h1" size="md">
                RikuTodo
              </Heading>
              <Text
                fontSize="sm"
                color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                Organize your daily tasks
              </Text>
            </Box>
          </HStack>
          <IconButton
            aria-label="Theme Toggle"
            borderRadius="full"
            icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
            onClick={toggleColorMode}
          />
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
