import * as react from 'react';
import { internalSdk } from '../../lib/sdks/api-sdk';

export interface ISetting {
  key: string;
  value: any;
}

export default function withSettings(Component: any, keys: string[]) {
  class withSettings extends react.Component<{
    settings: { key: string; value: any }[];
  }> {
    static async getInitialProps() {
      console.log(`/settings?keys=${encodeURI(keys.join(','))}`);

      const { data } = await internalSdk.get<{ key: string; value: string }[]>(
        `/settings?keys=${encodeURI(keys.join(','))}`,
        {},
      );

      return {
        settings: data,
      };
    }

    render() {
      const { settings } = this.props;
      return <Component settings={settings} />;
    }
  }

  return withSettings;
}
