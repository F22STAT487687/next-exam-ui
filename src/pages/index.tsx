import { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Button,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  QuestionIcon,
  Spacer,
  useRadioGroup
} from "@chakra-ui/react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import { MdCheck, MdError } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import writePut from "../hooks/writePut";
import Link from "next/link";
import readPut from "../hooks/readPut";

/**
 * still left todo
 * - deploy the exam contract
 * - complete the hooks for interaction with the contract
 * - finish a complete question multi-choice question
 * - finish a complete short answer question
 * - add all questions to each accordion panel
 * - deploy
 * - test
 */

const chainID = 11155111;

export default function Home() {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;

  const { lastGreeter, lastMessage } = readPut();
  const { put, loading } = writePut();

  const correctNetwork = useMemo(() => {
    return currentChain === chainID;
  }, [currentChain]);

  const [selection, setSelection] = useState('');

  const clearSelection = async () => setSelection('');

  // const updateSubmissions = async (_index: number) => {
  //   let copySubs = {...submissions};
  //   copySubs.index = _index;

  //   setSubmissions(prev => ({
  //     ...copySubs
  //   }))

  //   console.log(submissions);
  // };

  const handleSubmit = async (index: number) => {
    // e.preventDefault();
    // if (messages.trim() === "") return;

    put(`${index}${selection}`).then(console.log).then(() => clearSelection())
  };

  return (
    <div>
      <Head>
        <title>Fall 2023 STAT 487/687 Mid-term DApp UI</title>
      </Head>
      <HStack
        width="full"
        as="header"
        height="80px"
        px={4}
        alignItems="center"
        bg="gray.100"
      >
        <HStack as="nav" width="full" justifyContent="space-between">
          <HStack>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}
                variant="solid"
                bg="blue.400"
                colorScheme="blue"
                gap={2}
                color="white"
              >
                <Icon as={FaEthereum} />
                Connect wallet
              </Button>
            ) : (
              <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Button
                  onClick={disconnect}
                  variant="solid"
                  bg="red.400"
                  colorScheme="red"
                  color="white"
                  gap={2}
                >
                  <Icon as={BiLogOut} />
                  Disconnect
                </Button>
                <Spacer />
                <Text>
                  Connected address: {(address ? address : "Loading")}
                </Text>
              </Flex>
            )}
          </HStack>
        </HStack>
      </HStack>
      {
        isAuthenticated ? ((correctNetwork ? (
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  <Text fontSize="md" as="b">Question 1</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <VStack>
                  <Text textAlign="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat.
                  </Text>
                  <Flex minWidth='max-content' alignItems='center' gap='20'>
                    <RadioGroup onChange={setSelection}>
                      <Stack direction='row'>
                        <Radio value='A'>A</Radio>
                        <Radio value='B'>B</Radio>
                        <Radio value='C'>C</Radio>
                        <Radio value='D'>D</Radio>
                      </Stack>
                    </RadioGroup>
                    <Button
                      type="click"
                      variant="solid"
                      bg="green.400"
                      colorScheme="green"
                      color="white"
                      gap={2}
                      isLoading={loading}
                      onClick={() => handleSubmit(1)}
                    >
                      <Icon as={MdCheck} />
                      Submit
                    </Button>
                  </Flex>
                  {}
                  <Text></Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    <Text fontSize="md" as="b">Question 2</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              <AccordionPanel>
                <VStack>
                  <Text textAlign="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat.
                  </Text>

                  {/* <Box
                    onSubmit={(e) => handleSubmit(e, 2)}
                    as="form"
                    display="flex"
                    flexDirection="column"
                    gap={4}
                  >
                    <Input
                      type="text"
                      placeholder="Enter new message..."
                      variant="flushed"
                      colorScheme="blue"
                      name="message"
                      value={messages}
                      onChange={(e) => setMessages(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="solid"
                      bg="green.400"
                      colorScheme="green"
                      color="white"
                      gap={2}
                      isLoading={loading}
                    >
                      <Icon as={MdCheck} />
                      Submit
                    </Button>
                  </Box> */}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
          <HStack spacing={2} ml={4} mt={4}>
            <Icon as={MdError} color="red.400" />
            <Text color="red.400">Please switch to Sepolia Testnet</Text>
          </HStack>
        ))) : (
          <VStack>
            <HStack spacing={2} ml={4} mt={4}>
              <Icon as={QuestionIcon} color="Blue.400" />
              <Text fontSize='lg'>Welcome to the exam</Text>
            </HStack>
            <Text width="80%" pb={4} textAlign="justify">
              Description of the mid-term and how the students should go about 
              completing the assignment.
            </Text>
          </VStack>
        )
      }
      <VStack>
          <Text>
            Selection: {selection}
          </Text>
        </VStack>
    </div>
  );
}
