import React, { useState, useEffect } from "react";
import { Stack, Tag, Divider, Typography, Spinner } from "basikit";
import { RouteComponentProps, Link } from "react-router-dom";
const { Heading, Text } = Typography;

const Medicine: React.FC<RouteComponentProps> = ({ match, location }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [medicine, setMedicine] = useState();

  useEffect(() => {
    const getMedicine = async (id: string) => {
      const info = await fetch(`http://localhost:5000/medicine/${id}`)
        .then((res) => res.json())
        .catch((err) => {
          setIsLoading(false);
        });

      setIsLoading(false);
      setMedicine(info);
    };

    getMedicine((match as any).params.id);
  }, [match]);

  return (
    <Stack className="app" direction="column" size="large" block>
      {medicine ? (
        <>
          <Link to={`/?search=${(location.state as any)?.search}`}>
            Tillbaka
          </Link>
          <Stack align="center">
            <Heading>{medicine.name}</Heading>
            <Stack size="small">
              <Tag
                variant={Number(medicine.prescription) ? "warning" : "primary"}
              >
                {Number(medicine.prescription) ? "Receptbelagt" : "Receptfritt"}
              </Tag>
              {medicine.strength && (
                <Tag variant="warning">{medicine.strength}</Tag>
              )}
            </Stack>
          </Stack>
          <Text>{medicine.description}</Text>
          <Heading level={4}>Tillverkare: {medicine.brand}</Heading>
          <Stack direction="column">
            {Object.keys(medicine.sections).map((key) => (
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
        </>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <Text variant="error">Kunde inte hitta läkemedlet</Text>
      )}
    </Stack>
  );
};

export default Medicine;
