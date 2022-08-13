import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import { FaSortUp, FaSort, FaSortDown } from 'react-icons/fa';

const Table = ({data, ...props}) => {
  const [isNameSort, setNameSort] = useState(() => false);
  const [isNameSortReverse, setNameSortReverse] = useState(() => false);
  const [isPriceSort, setPriceSort] = useState(() => false);
  const [isPriceSortReverse, setPriceSortReverse] = useState(() => false);
  const [isCategorySort, setCategorySort] = useState(() => false);
  const [isCategorySortReverse, setCategorySortReverse] = useState(() => false);

  const SortIcon = ({isSortEnabled, isReverse, ...props}) => {
    if(isSortEnabled === true){
      if(isReverse === true){
        return <label className='icon-label sorted'><FaSortDown></FaSortDown></label>
      }
      else{
        return <label className='icon-label sorted'><FaSortUp></FaSortUp></label>
      }
    }
    else{
      return <label className='icon-label'><FaSort></FaSort></label>;
    }
  }

  const sortData = (sortParam, isReverseSort) => {
    data = data.sort((a, b) => {
      if(isReverseSort){
        return (a[sortParam] > b[sortParam]) ? -1 : (a[sortParam] < b[sortParam]) ? 1 : 0;
      }
      else{
        return (a[sortParam] < b[sortParam]) ? -1 : (a[sortParam] > b[sortParam]) ? 1 : 0;
      }
    });
  }

  const sortClickHandler = (sortParam) => {
    switch(sortParam){
      case 'name': setNameSort(true); setPriceSort(false); setCategorySort(false); setNameSortReverse(prev => !prev); setCategorySortReverse(false); setPriceSortReverse(false); sortData(sortParam, isNameSortReverse); break;
      case 'price': setNameSort(false); setPriceSort(true); setCategorySort(false); setNameSortReverse(false); setCategorySortReverse(false); setPriceSortReverse(prev => !prev); sortData(sortParam, isPriceSortReverse);  break;
      case 'category' : setNameSort(false); setPriceSort(false); setCategorySort(true); setNameSortReverse(false); setCategorySortReverse(prev => !prev); setPriceSortReverse(false); sortData(sortParam, isCategorySortReverse);  break;
    }
  }

  return(
    <>
      <div className="eps-table">
        <div className="eps-table-header">
          <div className='item col1' onClick={sortClickHandler.bind(this, 'name')}><label>Product Name</label>&nbsp;<SortIcon isSortEnabled={isNameSort} isReverse={isNameSortReverse}></SortIcon></div>
          <div className='item col2' onClick={sortClickHandler.bind(this, 'price')}><label>Price</label>&nbsp;<SortIcon isSortEnabled={isPriceSort} isReverse={isPriceSortReverse}></SortIcon></div>
          <div className='item col3' onClick={sortClickHandler.bind(this, 'category')}><label>Category</label>&nbsp;<SortIcon isSortEnabled={isCategorySort} isReverse={isCategorySortReverse}></SortIcon></div>
        </div>
        {
          data?.map((item, index) => (<div key={index} className={`eps-table-row ${index % 2 === 0 ? '' : 'dark'}`}>
            <div className='item col1'><label>{item["name"]}</label></div>
            <div className='item col2'><label>{item["price"]}</label></div>
            <div className='item col3'><label>{item["category"]}</label></div>
          </div>))
        }
        {/* <div className="eps-table-row"></div>
        <div className="eps-table-row dark"></div>
        <div className="eps-table-row"></div>
        <div className="eps-table-row dark"></div>
        <div className="eps-table-row"></div>
        <div className="eps-table-row dark"></div> */}
      </div>
    </>
  )
}

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/epsilon-ux/code-challenge-resources/main/cookies.json')
      .then(res => res.json())
      .then(res => {setData(res["cookies"])})
      .catch(err => {console.log(err)});
  }, [])

  return (
    <>
      <Table data={data}/>
    </>
  );
}

export default App;
