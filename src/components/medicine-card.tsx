import React from "react";
import { Link } from "react-router-dom";
import { Card, Stack, Tag, Divider, Typography } from "basikit";
import { medicineTypeToTitle } from "../lib";
const { Heading, Text } = Typography;

interface IMedicineCardProps {
  medicine: any;
  isLoading: boolean;
  link: {
    pathname: string;
    state: { [key: string]: string };
  };
  pushModal: (values: {
    title: string;
    content: React.ReactNode;
    id: string;
  }) => void;
}

const MedicineCard: React.FC<IMedicineCardProps> = ({
  medicine,
  link,
  isLoading,
  pushModal,
}) => (
  <Card skeleton={isLoading}>
    <Stack direction="column" size="small">
      <Link to={link}>
        <Heading
          level={4}
          dangerouslySetInnerHTML={{ __html: medicine.title_HL }}
        />
      </Link>

      <Stack direction="column" size="default">
        <Text>{medicine.substance}</Text>
        <Tag variant={medicine.type === "atc" ? "success" : "primary"}>
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
                  key={img}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    pushModal({
                      title: medicine.title,
                      content: (
                        <img
                          className="medicine-image-large"
                          alt="Pill"
                          src={src}
                        />
                      ),
                      id: "image-modal",
                    });
                  }}
                  alt="Pill"
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
);

export default MedicineCard;
