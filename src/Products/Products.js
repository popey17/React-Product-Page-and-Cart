import { useInfiniteQuery } from "react-query";
import Card from "../components/Card";
import "./Products.css"
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';

const getData = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(`https://items.aura.biocaremm.com/api/products?page=${pageParam}&limit=12`,{
      headers: {
          'Authorization': `Bearer ${Token}`,
      }
  });
    const data = response.data;
    // console.log(pageParam);
    return {data, prevOffset:pageParam}; 
    
  } catch (error) {
    // console.error('Error fetching data:', error);
    throw error; 
  }
};



const search = async ( pageParam , query ) => {
  try {
    const response = await axios.get(
      `https://items.aura.biocaremm.com/api/products/name/${query}?limit=12&page=${pageParam}`,
      {
        headers: {
          'Authorization': `Bearer ${Token}`,
        }
      }
    );
    const searchData = response.data;
    // console.log({ searchData, prevOffset: pageParam });
    return { searchData, prevOffset: pageParam };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


const searchCategory = async ( pageParam , query ) => {
  try {
    const response = await axios.get(
      `https://items.aura.biocaremm.com/api/products/category/${query}?limit=12&page=${pageParam}`,
      {
        headers: {
          'Authorization': `Bearer ${Token}`,
        }
      }
    );
    const searchCategoryData = response.data;
    console.log({ searchCategoryData, prevOffset: pageParam });
    return { searchCategoryData, prevOffset: pageParam };
  } catch (error) {
    console.log(error);
    throw error;
  }
}





function Products({handleCart, query, category}) {

  const {data, fetchNextPage , hasNextPage, isFetching} =useInfiniteQuery({
    queryKey : ['products'],
    queryFn : getData,
    getNextPageParam: lastPage => {
      // console.log(lastPage);
    if(lastPage.prevOffset + 1 > lastPage['data']['last_page']){
      return false;
    }
    return lastPage.prevOffset + 1;
    }
  })

  const {data:searchData} =useInfiniteQuery(
    ['searchDatas', query],
    ()=>search(1, query),{
    enabled: !!query,
    getNextPageParam: lastPage => {
      if(lastPage.prevOffset + 1 > lastPage['searchData']['last_page']){
        return false;
      }
      return lastPage.prevOffset + 1;
    }
  })

  console.log(searchData);


  const {data:searchCategoryData} =useInfiniteQuery(
    ['searchCategoryData', category],
    ()=>searchCategory(1, category),{
    enabled: !!category,
    getNextPageParam: lastPage => {
      if(lastPage.prevOffset + 1 > lastPage['searchCategoryData']['last_page']){
        return false;
      }
      return lastPage.prevOffset + 1;
    }
  })


  let datas;
    // console.log(data);
    if(query){
      datas = searchData?.pages.reduce((acc,page)=>{
        return [...acc,...page.searchData['data']]
    },[])
      // console.log(datas);
    }else if(category){
      datas = searchCategoryData?.pages.reduce((acc,page)=>{
        return [...acc,...page.searchCategoryData['data']]
    },[])
      // console.log(datas);
    }else {
      datas = data?.pages.reduce((acc,page)=>{
          return [...acc,...page.data['data']]
      },[])  
    }

  // console.log(datas);

  return (
    <div className="product-container-wrapper">
      <InfiniteScroll
      className="card-container"
      dataLength={datas? datas.length : 0}
      next={()=>fetchNextPage()}
      hasMore={hasNextPage}
      loading={<div>Loading...</div>}
      scrollThreshold={0.95}
      >
        {datas?.map(product=>(
          <Card key={product.id}
          id={product.id}
          name= {product.name}
          img={product.image}
          description={product.description}
          category={product.category.name}
          price={product.price}
          handleCart={handleCart}
          amount = {product.amount}
          moq={product.moq_amount}
          moqPrice={product.moq_price}
          total= {product.total}
          />
        ))}
      </InfiniteScroll>
      {isFetching && <div className="loading"><span className="text">Loading...</span></div>}
    </div>
  )
}

export default Products