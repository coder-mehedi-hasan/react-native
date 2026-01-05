import { Providers } from './providers';
import { AppNavigator } from '../navigation/AppNavigator';

export default function App() {
  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
}
