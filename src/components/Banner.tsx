import React from "react";
import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob";
import Config from "react-native-config";

export default class Banner extends React.PureComponent {
  render() {
    return (
      <BannerAd
        unitId={Config.AD_BANNER || TestIds.BANNER}
        size={BannerAdSize.SMART_BANNER}
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
