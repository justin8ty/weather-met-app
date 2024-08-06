import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('gray.50', 'gray.800')(props),
      color: mode('gray.800', 'gray.50')(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
