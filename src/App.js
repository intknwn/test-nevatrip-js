import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Container,
  Select,
  Heading,
  VisuallyHidden,
  Stack,
  Input,
  Text,
} from '@chakra-ui/react';

function App() {
  return (
    <Container pt='20'>
      <Heading fontSize='lg' mb='5'>
        Калькулятор маршрута
      </Heading>
      <Stack spacing='5'>
        <FormControl>
          <VisuallyHidden>
            <FormLabel>Выберите маршрут</FormLabel>
          </VisuallyHidden>
          <Select placeholder='Выберите маршрут' required>
            <option value='ab'>из A в B</option>
            <option value='ba'>из B в A</option>
            <option value='aba'>из A в B и обратно в А</option>
          </Select>
        </FormControl>
        <FormControl>
          <VisuallyHidden>
            <FormLabel>Выберите время отправления из точки А</FormLabel>
          </VisuallyHidden>
          <Select placeholder='Выберите время отправления из точки А' required>
            <option value='ab'>из A в B</option>
            <option value='ba'>из B в A</option>
            <option value='aba'>из A в B и обратно в А</option>
          </Select>
        </FormControl>
        <FormControl>
          <VisuallyHidden>
            <FormLabel>Выберите время отправления из точки B</FormLabel>
          </VisuallyHidden>
          <Select placeholder='Выберите время отправления из точки B' required>
            <option value='ab'>из A в B</option>
            <option value='ba'>из B в A</option>
            <option value='aba'>из A в B и обратно в А</option>
          </Select>
        </FormControl>
        <FormControl>
          <VisuallyHidden>
            <FormLabel>Количество билетов</FormLabel>
          </VisuallyHidden>
          <Input placeholder='Укажите количество билетов' required />
        </FormControl>
        <Button>Посчитать</Button>
        <Box borderRadius='5'>
          <Text>
            Вы выбрали 4 билета по маршруту из A в B стоимостью 4000р.
          </Text>
          <Text>Это путешествие займет у вас 40 минут.</Text>
          <Text>Теплоход отправляется в 12-00, а прибудет в 18-00.</Text>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
