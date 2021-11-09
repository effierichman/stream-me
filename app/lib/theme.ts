// Material-UI was designed from the ground-up with the constraint of rendering on the server, but it's up to you to make sure it's correctly integrated. It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker. To inject the style down to the client, we need to:

import grey from '@material-ui/core/colors/grey'
import { createTheme } from '@material-ui/core'

const themeDark = createTheme({
  palette: {
    primary: { main: grey[200] },
    secondary: { main: grey[400] },
    type: 'dark',
  },
})

const themeLight = createTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: grey[900] },
    type: 'light',
  },
})

export { themeDark, themeLight }

// We just created two themes: themeDark and themeLight, which are used to toggle dark and light color palettes.
