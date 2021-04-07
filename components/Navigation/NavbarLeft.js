import React, { useState } from 'react'
import {
    Flex,
    Box,
    IconButton,
    Button,
    useColorMode,
    Tooltip,
    WrapItem,
    Icon
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { FiInfo, FiScissors, FiBookOpen, FiEdit2, FiHome } from "react-icons/fi"

const NavBarLeft = () => {
    const [display, changeDisplay] = useState('none')
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const boxShadowColor = {
        light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
        dark: '0 4px 12px 0 rgba(0, 0, 0, 1)'
    }
    return (
        <Box
            w={100}
            h="100vh"
            bgColor={bgColor[colorMode]}
            pos="fixed"
            left={0}
            top={0}
            as="nav"
            boxShadow={boxShadowColor[colorMode]}
            display={['none', 'none', 'flex']}
        >
            <Flex
                flexDir="column"
                align="center"
                w="100%"
            >
                <NextLink href="/" passHref>
                    <WrapItem w="100%">
                        <Tooltip
                            hasArrow
                            label="Home"
                            placement="right"
                            closeDelay={100}
                        >
                            <Button
                                variant="ghost"
                                aria-label="Home"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                            >
                                <Icon as={FiHome} fontSize="2xl" />
                            </Button>
                        </Tooltip>
                    </WrapItem>
                </NextLink>


                <NextLink href="/snippets" passHref>
                    <WrapItem w="100%">
                        <Tooltip
                            hasArrow
                            label="Snippets"
                            placement="right"
                            closeDelay={100}
                        >
                            <Button
                                variant="ghost"
                                aria-label="Snippets"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                            >
                                <Icon as={FiScissors} fontSize="2xl" />
                            </Button>
                        </Tooltip>
                    </WrapItem>
                </NextLink>

                <NextLink href="/learn" passHref>
                    <WrapItem w="100%">
                        <Tooltip
                            hasArrow
                            label="Learn"
                            placement="right"
                            closeDelay={100}
                        >
                            <Button
                                variant="ghost"
                                aria-label="Learn"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                            >
                                <Icon as={FiEdit2} fontSize="2xl"/>
                            </Button>
                        </Tooltip>
                    </WrapItem>
                </NextLink>

                <NextLink href="/tutorials" passHref>
                    <WrapItem w="100%">
                        <Tooltip
                            hasArrow
                            label="Tutorials"
                            placement="right"
                            closeDelay={100}
                        >
                            <Button
                                variant="ghost"
                                aria-label="Tutorials"
                                my={5}
                                w="100%"
                                _hover={{ background: 'none' }}
                            >
                                <Icon as={FiBookOpen} fontSize="2xl" />
                            </Button>
                        </Tooltip>
                    </WrapItem>
                </NextLink>

                {display == 'none' &&
                    <IconButton
                        onClick={() => changeDisplay('flex')}
                        icon={<ChevronDownIcon />}
                        background="none"
                        _hover={{ background: 'none' }}
                    />
                }

                <Flex
                    display={display}
                    flexDir="column"
                    align="center"
                    w="100%"
                >
                    <NextLink href="/about" passHref>
                        <WrapItem w="100%">
                            <Tooltip
                                hasArrow
                                label="About"
                                placement="right"
                                closeDelay={100}
                            >
                                <Button
                                    variant="ghost"
                                    aria-label="About"
                                    my={5}
                                    w="100%"
                                    _hover={{ background: 'none' }}
                                >
                                    <Icon as={FiInfo} fontSize="2xl" />
                                </Button>
                            </Tooltip>
                        </WrapItem>
                    </NextLink>

                    <IconButton
                        onClick={() => changeDisplay('none')}
                        icon={<ChevronUpIcon />}
                        background="none"
                        _hover={{ background: 'none' }}
                    />
                </Flex>
            </Flex>
        </Box >
    )
}

export default NavBarLeft