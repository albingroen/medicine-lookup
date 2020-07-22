import React from "react";
import queryString from "query-string";
import { Stack, Input, Button, Typography } from "basikit";
import { useHistory } from "react-router-dom";
const { Heading } = Typography;

interface IHeaderProps {
  value: string;
  setValue: (value: string) => void;
}

const Header: React.FC<IHeaderProps> = ({ value, setValue }) => {
  const history = useHistory();

  return (
    <>
      <Heading>{"Sök efter Svensk medicin"}</Heading>
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
          {"Sök"}
        </Button>
      </Stack>
    </>
  );
};

export default Header;
