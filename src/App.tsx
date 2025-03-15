import MainLayout from "./components/layout/MainLayout";
import PrivateRoute from "./components/layout/PrivateRoute";

const App = () => {
  return (
    <div>
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    </div>
  );
};

export default App;
