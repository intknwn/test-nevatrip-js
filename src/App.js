import { useState } from 'react';
import { DateTime } from 'luxon';

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

import {
  TRIP_DURAION_MINUTES,
  ONE_WAY_TICKET,
  RETURN_TICKET,
  Routes,
  departures,
} from './const';

import { getNoun } from './helpers';

function App() {
  const [route, setRoute] = useState(null);
  const [timeAb, setTimeAb] = useState(null);
  const [timeBa, setTimeBa] = useState(null);
  const [ticketsNum, setTicketsNum] = useState(null);
  const [calculated, setCalculated] = useState(false);

  const createOnChangeHandler = (cb) => (e) => {
    cb(e.target.value);
    setCalculated(false);
  };

  const clickHandler = () => {
    setCalculated(true);
  };

  const checkRequired = (...args) => {
    const isValid = args.length > 0 ? args.every((x) => x) : true;

    if (route === 'aba') {
      return route && timeAb && timeBa && isValid;
    }

    const oneWay = route === 'ab' ? timeAb : timeBa;

    return route && oneWay && isValid;
  };

  const CalculatedTotal = () => {
    return (
      <Box borderRadius='5'>
        <Text>
          {`
      Вы выбрали ${ticketsNum} ${getNoun(
            ticketsNum,
            'билет',
            'билета',
            'билетов'
          )} по маршруту ${Routes[route.toUpperCase()]} стоимостью ${
            route === 'aba'
              ? ticketsNum * RETURN_TICKET
              : ticketsNum * ONE_WAY_TICKET
          } руб.`}
        </Text>
        <Text>
          {`Это путешествие займет у вас ${
            route === 'aba' ? TRIP_DURAION_MINUTES * 2 : TRIP_DURAION_MINUTES
          } минут.`}
        </Text>
        <Text>
          {`Теплоход отправляется в ${DateTime.fromISO(timeAb).toLocaleString(
            DateTime.TIME_SIMPLE
          )}, а прибудет в ${DateTime.fromISO(timeAb)
            .plus({ minutes: TRIP_DURAION_MINUTES })
            .toLocaleString(DateTime.TIME_SIMPLE)}.`}
        </Text>
        {route === 'aba' && (
          <Text>
            {`Обратно теплоход отправляется в ${DateTime.fromISO(
              timeBa
            ).toLocaleString(
              DateTime.TIME_SIMPLE
            )}, а прибудет в ${DateTime.fromISO(timeBa)
              .plus({ minutes: TRIP_DURAION_MINUTES })
              .toLocaleString(DateTime.TIME_SIMPLE)}.`}
          </Text>
        )}
      </Box>
    );
  };

  const createTimetable = (route) => {
    const a = departures.A.map((time) => DateTime.fromISO(time));
    const b = departures.B.map((time) => DateTime.fromISO(time));

    if (route === 'aba') {
      return [
        a,
        b.filter(
          (time) =>
            time.diff(DateTime.fromISO(timeAb), 'minutes').minutes >
            TRIP_DURAION_MINUTES
        ),
      ];
    }

    return [a, b];
  };

  const Control = ({ from, timetable }) => (
    <FormControl>
      <VisuallyHidden>
        <FormLabel>Время отправления из точки {from}</FormLabel>
      </VisuallyHidden>
      <Select
        name={`from-${from}`}
        placeholder={`Время отправления из точки ${from}`}
        required
        onChange={createOnChangeHandler(from === 'A' ? setTimeAb : setTimeBa)}
        defaultValue={from === 'A' ? timeAb : timeBa}
      >
        {timetable.map((time) => (
          <option key={time} value={time.toISO()}>
            {time.toLocaleString(DateTime.TIME_SIMPLE)}
          </option>
        ))}
      </Select>
    </FormControl>
  );

  const Fields = ({ route }) => {
    const [a, b] = createTimetable(route);

    switch (route) {
      case 'ab':
        return <Control from='A' timetable={a} />;
      case 'ba':
        return <Control from='B' timetable={b} />;
      case 'aba':
        return (
          <>
            <Control from='A' timetable={a} />
            <Control from='B' timetable={b} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container pt='20'>
      <Heading fontSize='lg' mb='5' textAlign='center'>
        Калькулятор маршрута
      </Heading>

      <Stack spacing='5'>
        <FormControl>
          <VisuallyHidden>
            <FormLabel>Выберите маршрут</FormLabel>
          </VisuallyHidden>
          <Select
            name='route'
            placeholder='Выберите маршрут'
            onChange={createOnChangeHandler(setRoute)}
            required
          >
            {Object.entries(Routes).map(([key, value]) => (
              <option key={key} value={key.toLowerCase()}>
                {value}
              </option>
            ))}
          </Select>
        </FormControl>

        {route && <Fields route={route} />}

        {checkRequired() && (
          <FormControl>
            <VisuallyHidden>
              <FormLabel>Количество билетов</FormLabel>
            </VisuallyHidden>
            <Input
              type='number'
              placeholder='Количество билетов'
              onChange={createOnChangeHandler(setTicketsNum)}
              required
            />
          </FormControl>
        )}

        {checkRequired(ticketsNum) && (
          <Button type='submit' onClick={clickHandler}>
            Посчитать
          </Button>
        )}

        {calculated && <CalculatedTotal />}
      </Stack>
    </Container>
  );
}

export default App;
