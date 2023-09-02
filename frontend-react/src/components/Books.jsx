import { Card, Heading, Image, Text, VStack } from '@chakra-ui/react';

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Card key={id} my={4} p={4} cursor="pointer">
      <VStack>
        <Heading size={'md'}>
          {title} ({year})
        </Heading>
        <Text>{author}</Text>
        <Image w={24} h={24} src={`http://localhost:8000/${image}`} />
        <Text>
          <span>Publisher: </span>
          {publisher}
        </Text>
      </VStack>
    </Card>
  );
}
