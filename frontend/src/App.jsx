import "./App.css";
import Filters from "./components/Filters";
import Header from "./components/Header";
import Rondas from "./components/Rondas";
import useFilters from "./hooks/useFilters";

function App() {
  const { data } = useFilters();

  return (
    <>
      <Header />
      <main>
        <Filters />
        {data && <Rondas rondas={data.results} />}
      </main>
    </>
  );
}

export default App;
