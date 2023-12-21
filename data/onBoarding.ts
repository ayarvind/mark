import OnBoarding from '../interface/OnBoarding'

import strings from '../common/strings'
import {name as appName} from '../app.json'
const data: OnBoarding[] = [
    {
        title:'Join our community',
        image:require('../assets/images/onboarding/welcome1.png'),
        description: 'Talk to the one you like the most and that interests you.'
    },
    {
        title:`${strings.title(appName)} Unleashes the Power of Personalized Socializing!`,
        image:require('../assets/images/onboarding/welcome1.png'),
        description:'Discover a New Realm of Social Connectivity – Connect on a Deeper Level with Call, Text, and Voice Features.'
    }
]

export default data;