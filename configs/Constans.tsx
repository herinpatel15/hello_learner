import { IsIPAD } from "@/theme/appConstant";
import { OnboardingSlideType } from "@/types/configs/constantsTypes";
import { Image } from "react-native";
import { verticalScale } from "react-native-size-matters";

//import images
import One from "../assets/images/onBoarding/1.png"
import Two from "../assets/images/onBoarding/2.png"
import Three from "../assets/images/onBoarding/3.png"
 
export const onBoardingSlides: OnboardingSlideType[] = [
    {
        color: "#40E0D0",
        title: "Welcome to our platform",
        secondTitle: "We are glad you are here",
        subTitle: "This is the first slide of our onboarding process",
        image: (
            <Image
                source={One}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }}
            />
        ),
    },
    {
        color: "#A7F893",
        title: "Welcome to our platform",
        secondTitle: "We are glad you are here",
        subTitle: "This is the first slide of our onboarding process",
        image: (
            <Image
                source={Two}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }}
            />
        ),
    },
    {
        color: "#FFC0CB",
        title: "Welcome to our platform",
        secondTitle: "We are glad you are here",
        subTitle: "This is the first slide of our onboarding process",
        image: (
            <Image
                source={Three}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }}
            />
        ),
    }
]