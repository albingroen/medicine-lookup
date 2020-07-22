import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { debounce } from "lodash-es";
import {
  Input,
  Stack,
  Typography,
  Grid,
  Card,
  Tag,
  useModal,
  Divider,
  Button,
  Spinner,
} from "basikit";
import { useHistory } from "react-router-dom";
import { medicineTypeToTitle } from "../lib";
const { Heading, Text } = Typography;

const Start = () => {
  const { search } = queryString.parse(window.location.search);

  const history = useHistory();
  const [value, setValue] = useState<string>(
    search && typeof search === "string" ? search : ""
  );
  const [results, setResults] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pushModal } = useModal();

  useEffect(() => {
    const searchMedicine = debounce((value: string) => {
      fetch(
        `https://basikit-demo-server.herokuapp.com/medicine?search=${value}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res?.medicines.length) {
            setIsLoading(false);
            setResults(res.medicines);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }, 500);

    if (typeof search === "string" && search?.length > 3) {
      setIsLoading(true);
      searchMedicine(search);
    }
  }, [search]);

  return (
    <Stack direction="column" className="app" size="large">
      <Heading>Sök efter Svensk medicin</Heading>
      <Stack size="small" block align="stretch">
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          block
          placeholder="Börja söka efter en medicin eller ett symptom..."
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              history.push({
                search: queryString.stringify({
                  search: value,
                }),
              });
            }
          }}
        />
        <Button
          onClick={() => {
            history.push({
              search: queryString.stringify({
                search: value,
              }),
            });
          }}
          variant="primary"
        >
          Sök
        </Button>
      </Stack>

      {results ? (
        <div
          style={{
            height: "calc(100vh - 200px)",
            overflowY: "auto",
            width: "100%",
          }}
        >
          <Grid gap="1rem" columns="repeat(auto-fit, minmax(400px, 1fr))">
            {results?.map((medicine) => (
              <Card
                skeleton={isLoading}
                style={{ cursor: "pointer" }}
                onClick={async () =>
                  history.push(`/${medicine.id}`, { search: value })
                }
              >
                <Stack direction="column" size="small">
                  <Heading
                    level={4}
                    dangerouslySetInnerHTML={{ __html: medicine.title_HL }}
                  />
                  <Stack direction="column" size="default">
                    <Text>{medicine.substance}</Text>
                    <Tag
                      variant={medicine.type === "atc" ? "success" : "primary"}
                    >
                      {medicineTypeToTitle[medicine.type]}
                    </Tag>
                  </Stack>
                  {medicine?.images?.length && (
                    <>
                      <Divider spacing="medium" />
                      <Stack>
                        {medicine?.images?.map((img: string) => {
                          const src = `https://lakemedelsboken.se/${img}`;

                          return (
                            <img
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                pushModal({
                                  title: medicine.title,
                                  content: (
                                    <img
                                      className="medicine-image-large"
                                      alt=""
                                      src={src}
                                    />
                                  ),
                                  id: "image-modal",
                                });
                              }}
                              alt=""
                              className="medicine-image"
                              src={src}
                            />
                          );
                        })}
                      </Stack>
                    </>
                  )}
                </Stack>
              </Card>
            ))}
          </Grid>
        </div>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <Text>Sök på exempelvis "Alvedon", "kortison", eller "pfizer"</Text>
      )}
    </Stack>
  );
};

export default Start;
