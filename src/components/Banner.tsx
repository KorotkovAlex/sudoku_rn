import React from "react";
import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob";

export default class Banner extends React.PureComponent {
  render() {
    return (
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
        onAdLoaded={() => {}}
        onAdFailedToLoad={(error: any) => {
          console.log("Advert failed to load: ", error);
        }}
      />
    );
  }
}
