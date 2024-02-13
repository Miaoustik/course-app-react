import ArticleRows from "../components/ArticleRows";
import priceFormater from "../utils/priceFormater";
import { useData } from "../contexts/DataContext";

export default function List() {
  const {budgetSalaireCompte, budgetListMois} = useData();

  return (
    <Flex
      paddingTop={6}
      justifyContent={"end"}
      w={"full"}
      h={"full"}
      bg="black"
      alignItems={"center"}
    >
      <Box w={"full"} h={"full"} paddingX={5} paddingTop={2} paddingBottom={10}>
        <Text
          textAlign={"center"}
          fontSize={20}
          color={"white"}
          marginBottom={5}
        >
          Budget
        </Text>
        <Flex direction="row" justifyContent={"space-between"} paddingRight={2}>
          <Text color={"white"}>
            Total :
            <Text color={"cyan.500"} fontSize={20}>
              {priceFormater(budgetSalaireCompte)}
            </Text>
          </Text>
          <Text marginBottom={5} color={"white"}>
            Disponible :
            <Text color={budgetListMois < 0 ? "red.500" : "green.500"} fontSize={20}>
              {priceFormater(budgetListMois)}
            </Text>
          </Text>
        </Flex>
        <ArticleRows
          dbKey={"listMois"}
        />
      </Box>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
    </Flex>
  );
}
