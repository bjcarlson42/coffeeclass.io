import {
    Heading,
    Flex,
    Stack,
    Text,
    useColorMode
} from '@chakra-ui/react'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../utils/mdxUtils'
import Tutorial from '../../components/Cards/Tutorial'

export default function Index({ posts }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    return (
        <Container>
            <Stack
                spacing={8}
                px={4}
            >
                <Flex flexDir="column" mt={50}>
                    <Heading as="h1" size="2xl" mb={4}>Coffeeclass Tutorials 📚</Heading>
                    <Text color={color[colorMode]} mb={8} fontSize="lg">Tutorials are involved and usually correspond to a YouTube video. They typically take 15 minutes at a minimum to complete.</Text>
                    <Flex wrap="wrap">
                        {posts.map((post) => (
                            <Tutorial
                                key={post.filePath}
                                src={`/content/tutorials/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                title={post.data.title}
                                description={post.data.description}
                                tags={post.data.tags}
                                as={`/tutorials/${post.filePath.replace(/\.mdx?$/, '')}`}
                                href={`/tutorials/[slug]`}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
    const posts = tutorialsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TUTORIALS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content, // do I need to fetch content? This may cause significant load time down the line
            data,
            filePath,
        }
    })

    return { props: { posts } }
}