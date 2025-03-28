import MainLayout from "./components/layout/MainLayout";
import PrivateRoute from "./components/layout/PrivateRoute";

const App = () => {
  return (
    <div>
      <PrivateRoute role={undefined}>
        <MainLayout />
      </PrivateRoute>
    </div>
  );
};

export default App;
