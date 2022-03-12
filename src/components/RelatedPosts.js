import { useState, useEffect } from 'react'
import {
    Heading,
    Flex,
    Text,
    Box,
    useColorModeValue,
    AspectRatio,
    Link,
    Wrap,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import Subscribe from '../components/Subscribe'
import TimeAgo from "../scripts/time-ago"
import CarbonAd from '../components/Content/Ad'
import HeadersSidebar from './HeadersSidebar'

export default function RelatedPosts({ frontMatter, posts, style }) {
    var relatedPosts = []

    // loop through all tags and see if they match any of the tags of the current post
    for (var i = 0; i < frontMatter.tags.length; i++) {
        posts.map(post => {
            post.data.tags.map(tag => {
                if (frontMatter.tags[i] == tag) {
                    relatedPosts.push(post)
                }
            })
        })
    }

    // remove duplicates
    relatedPosts = [...new Set(relatedPosts)]

    // remove current post
    relatedPosts = relatedPosts.filter(
        post => post.data.title !== frontMatter.title
    )

    // order posts by date
    relatedPosts.sort((a, b) => {
        return new Date(b.data.publishedAt) - new Date(a.data.publishedAt)
    })

    const [scrollY, setScrollY] = useState(0)

    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const bgColor = useColorModeValue("gray.200", "gray.700")
    const color = useColorModeValue("gray.500", "gray.400")
    const boxShadow = useColorModeValue("0px 8px 26px rgba(0, 0, 0, 0.25)", "0px 8px 26px rgba(255, 255, 255, 0.25)")
    const bgColor1 = useColorModeValue("gray.100", "gray.700")
    const color1 = useColorModeValue("gray.700", "gray.400")
    const headerColor = useColorModeValue('gray.600', 'gray.400')

    const [loaded, setLoaded] = useState(false)

    if (style == "sidebar") {
        return (
            <>
                <Flex
                    flexDir="column"
                    // opacity={scrollY > 100 ? 1 : 0}
                    transition="opacity .7s ease-in-out"
                    // visibility={scrollY > 100 ? "visible" : "hidden"}
                    px={2}
                >
                    <Box>
                        {/* <Box overflowY="auto" overflowX="hidden" h="calc(100vh - 100px)" as="aside"> */}
                        <Text
                            m={2}
                            textTransform="uppercase"
                            color={headerColor}
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            Related Tags
                        </Text>
                        <Wrap>
                            {frontMatter.tags.map((tag, index) => {
                                return (
                                    <Box key={index} px={2}>
                                        <NextLink href={`/tags/${tag}`} passHref>
                                            <Link
                                                href={`/tags/${tag}`}
                                                color={color}
                                                fontSize="sm"
                                                fontWeight="semibold"
                                                _hover={{ color: "brand_one.500" }}
                                            >
                                                #{tag}
                                            </Link>
                                        </NextLink>
                                    </Box>
                                )
                            })}
                        </Wrap>

                        {relatedPosts.length > 0 && (
                            <Text
                                mt={8}
                                mb={2}
                                mx={2}
                                textTransform="uppercase"
                                color={headerColor}
                                fontSize="sm"
                                fontWeight="semibold"
                            >
                                Related Posts
                            </Text>
                        )}
                        {relatedPosts.slice(0, 5).map(post => {
                            return (
                                <NextLink href={`/articles/${post.filePath.replace(/\.mdx?$/, '')}`} key={post.data.title}>
                                    <Box
                                        p={2}
                                        _hover={{
                                            bgColor: bgColor1,
                                            cursor: "pointer",
                                            textDecoration: 'underline',
                                        }}
                                        my={1}
                                        borderRadius={2}
                                    >
                                        <Heading
                                            as="h5"
                                            size="sm"
                                            color={color1}
                                            my={1}
                                            fontWeight="normal"
                                        >
                                            {post.data.title} &middot; {TimeAgo(new Date(post.data.publishedAt))}
                                        </Heading>
                                    </Box>
                                </NextLink>
                            )
                        })}
                        <Subscribe isSidebar />
                        {/* <HeadersSidebar headers={frontMatter?.headers} /> */}
                        <CarbonAd />
                    </Box>
                </Flex>
            </>
        )
    }

    return (
        relatedPosts.length > 0 ?
            <>
                <Flex flexDir="column" w="100vw" maxW={800} minW={320}>
                    <Heading as="h4" size="md" mb={2} px={4}>View Related Posts</Heading>
                    <Flex overflowX="auto">
                        {relatedPosts.map(post => (
                            <NextLink
                                href={`/articles/${post.filePath.replace(/\.mdx?$/, '')}`}
                                _hover={{
                                    cursor: "pointer",
                                }}
                                key={post.data.title}
                            >
                                <Flex
                                    flexDir="column"
                                    justify="space-between"
                                    bgColor={bgColor}
                                    m={2}
                                    p={5}
                                    transition='box-shadow 0.3s ease-in-out'
                                    borderRadius={5}
                                    _hover={{
                                        boxShadow: boxShadow,
                                        cursor: "pointer",
                                    }}
                                    maxW={200}
                                >
                                    <Text mb={2} minW={120} textAlign="center" color={color} fontSize="xs">{TimeAgo(new Date(post.data.publishedAt))}</Text>
                                    <Box>
                                        <Box
                                            w={50}
                                            h={50}
                                            my={2}
                                            mx="auto"
                                        >
                                            <AspectRatio ratio={1}>
                                                {/* <MySkeleton> */}
                                                <NextImage
                                                    src={`/logos/${post.data.logoImage}`}
                                                    alt={post?.data?.logoImage}
                                                    layout="fill"
                                                // onLoad={() => setLoaded(true)}
                                                />
                                                {/* </MySkeleton> */}
                                            </AspectRatio>
                                        </Box>
                                    </Box>

                                    {
                                        post?.data?.featureImg &&
                                        <Flex justify="center">
                                            <AspectRatio w="100%" ratio={16 / 9}>
                                                <NextImage src={`/content/articles/${post?.filePath.replace(".mdx", "")}/${post?.data?.featureImg}`} alt={post?.data?.title} layout="fill" />
                                            </AspectRatio>
                                        </Flex>
                                    }
                                    <Heading size="sm" mt={4}>{post.data.title}</Heading>
                                </Flex>
                            </NextLink>
                        ))}
                    </Flex>
                </Flex>
            </> : <Text fontSize="lg" px={4}>No related posts! Like {frontMatter.tags[0]}? Try <Link href="https://benjamincarlson.notion.site/Contributing-to-Coffeeclass-io-27ab5e894368424a9c86a7f11555514b" isExternal color="blue.500">writing about it</Link>.</Text>
    )
}
