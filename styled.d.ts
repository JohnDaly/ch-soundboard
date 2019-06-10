// import original module declarations
import 'styled-components'
import { AppTheme } from 'src/helpers/theme'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}