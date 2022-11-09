import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faBars, faBell, faCaretDown, faCloud, faTemperatureThreeQuarters, faDroplet, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function loadIcon() {
  library.add(faCoffee, faBars, faBell, faCaretDown, faCloud, faTemperatureThreeQuarters, faDroplet, faPlus);
}