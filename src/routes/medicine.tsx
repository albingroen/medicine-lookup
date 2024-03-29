import React, { useState, useEffect } from "react";
import { Stack, Tag, Divider, Typography, Spinner } from "basikit";
import { RouteComponentProps, Link } from "react-router-dom";
import { getMedicine } from "../lib";
const { Heading, Text } = Typography;

const Medicine: React.FC<RouteComponentProps> = ({ match, location }) => {
  // Keep track of current search value
  const currentSearch = (location.state as any)?.search;

  // Hooks
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [medicine, setMedicine] = useState();

  // Get specific medicine
  useEffect(() => {
    getMedicine((match as any).params.id)
      .then((res) => {
        setIsLoading(false);
        setMedicine(res);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [match]);

  return (
    <Stack className="app" direction="column" size="large" block>
      {medicine ? (
        <>
          <Link to={currentSearch ? `/?search=${currentSearch}` : "/"}>
            {"Tillbaka"}
          </Link>
          <Stack
            align="center"
            style={{ justifyContent: "space-between" }}
            block
          >
            <Heading>{medicine.name}</Heading>
            <Stack size="small">
              <Tag
                variant={Number(medicine.prescription) ? "error" : "primary"}
              >
                {Number(medicine.prescription) ? "Receptbelagt" : "Receptfritt"}
              </Tag>
              {medicine.strength && (
                <Tag variant="warning">{medicine.strength}</Tag>
              )}
            </Stack>
          </Stack>
          <Text>{medicine.description}</Text>
          <Heading level={4}>
            {"Tillverkare:"} {medicine.brand}
          </Heading>
          {medicine?.images?.length ? (
            <Stack block style={{ overflowX: "auto" }} align="stretch">
              {medicine?.images.map(
                (img: { description: string; checksum: string }) => (
                  <img
                    src={`https://lakemedelsboken.se//products/images/${img.checksum}.jpg`}
                    alt={img.description}
                    key={img.checksum}
                  />
                )
              )}
            </Stack>
          ) : null}
          {medicine?.sections && (
            <Stack direction="column">
              {Object.keys(medicine.sections)
                .filter((key) => medicine.sections[key]?.length > 7)
                .map((key) => (
                  <Stack direction="column" key={key} block>
                    <Heading level={3}>{key}</Heading>
                    <Divider />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: medicine.sections[key],
                      }}
                      className="sections"
                    />
                  </Stack>
                ))}
            </Stack>
          )}
        </>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <Text variant="error">{"Kunde inte hitta läkemedlet"}</Text>
      )}
    </Stack>
  );
};

export default Medicine;
