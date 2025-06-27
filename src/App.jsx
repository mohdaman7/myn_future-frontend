import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import ThemeCustomization from 'themes';

export default function App() {
  return (
    <ThemeCustomization>
      <RouterProvider router={router} />
    </ThemeCustomization>
  );
}
