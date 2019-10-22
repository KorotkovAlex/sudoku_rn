import React from "react";
import {
  firebase,
  BannerAd,
  BannerAdSize,
  TestIds
} from "@react-native-firebase/admob";

export default class Banner extends React.PureComponent {
  render() {
    console.log("render");
    return (
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
        onAdLoaded={() => {
          console.log("end");
        }}
        onAdFailedToLoad={(error: any) => {
          console.log("Advert failed to load: ", error);
        }}
      />
    );
  }
}
