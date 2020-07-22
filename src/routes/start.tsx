import React from "react";
import queryString from "query-string";
import { debounce } from "lodash-es";
import { RouteComponentProps } from "react-router-dom";
import { getMedicines } from "../lib";
import { Spinner, Stack, Typography, useModal } from "basikit";
import MedicinesList from "../components/medicines-list";
import Header from "../components/header";
const { Text } = Typography;

const Start: React.FC<RouteComponentProps> = ({ location }) => {
  // Search from URI
  const { search } = queryString.parse(location.search);

  // Hooks
  const [value, setValue] = React.useState<string>(
    search && typeof search === "string" ? search : ""
  );
  const [results, setResults] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { pushModal } = useModal();

  // Fetch projects when search updates
  React.useEffect(() => {
    const searchMedicine = debounce(async (value: string) => {
      getMedicines(value)
        .then(({ medicines }) => {
          setResults(medicines?.length ? medicines : []);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, 500);

    if (typeof search === "string") {
      setIsLoading(true);
      searchMedicine(search);
    }
  }, [search]);

  return (
    <Stack direction="column" className="app" size="large">
      <Header value={value} setValue={setValue} />

      {results.length ? (
        <MedicinesList
          medicines={results}
          isLoading={isLoading}
          pushModal={pushModal}
          value={value}
        />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <Text>{'Sök på exempelvis "Alvedon", "kortison", eller "pfizer"'}</Text>
      )}
    </Stack>
  );
};

export default Start;
