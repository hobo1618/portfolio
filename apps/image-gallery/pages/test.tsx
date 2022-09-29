import type { NextPage, GetServerSideProps } from "next";
import pocketbaseInit from "pocketbaseInit";

interface Props {
  items: any
}

export const getServerSideProps: GetServerSideProps = async () => {
  async function getItems() {
    const client = await pocketbaseInit(
      `${process.env.DB_USER}`,
      `${process.env.DB_PASS}`
    );
    const resultList = await client.records.getList("items", 1, 50, {
      filter: 'created >= "2022-01-01 00:00:00"',
    });
    return resultList.items
  }

  const items = await getItems();

  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
    },
  };
};

const Test: NextPage<Props> = (props) => {
  console.log(props.items);
  
  return (
    <div>
      <h1>test page</h1>
    </div>
  );
}

export default Test;
