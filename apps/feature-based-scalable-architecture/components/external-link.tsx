import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

type Props = {
  href: string;
  children: React.ReactNode;
  style?: any;
};

export function ExternalLink({ href, children, style }: Props) {
  const handlePress = async () => {
    if (Platform.OS === 'web') {
      // Open in a new tab on web
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Use expo web browser on native
    await WebBrowser.openBrowserAsync(href);
  };

  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
}
